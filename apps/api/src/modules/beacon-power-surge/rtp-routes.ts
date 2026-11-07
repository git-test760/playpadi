import type {
  FastifyInstance,
  FastifyRequest,
  preHandlerHookHandler,
} from "fastify";
import {
  assertValidDistributionBps,
  isBeaconPowerSurgeTier,
  RtpVersionConflictError,
  type BeaconPowerSurgeTier,
} from "./rtp.js";
import type { RtpConfigRepository } from "./rtp-repository.js";

interface RtpParams {
  tier: string;
}

interface UpdateRtpBody {
  distributedBps: number;
  expectedVersion: number;
  changeReason: string;
}

export interface RtpRouteOptions {
  repository: RtpConfigRepository;
  requireAdmin: preHandlerHookHandler;
  getActorId: (request: FastifyRequest) => string | Promise<string>;
}

/** Admin-only configuration endpoints. No public write endpoint is exposed. */
export async function registerBeaconPowerSurgeRtpRoutes(
  app: FastifyInstance,
  options: RtpRouteOptions,
): Promise<void> {
  app.get(
    "/admin/beacon-power-surge/rtp",
    { preHandler: options.requireAdmin },
    async () => ({ data: await options.repository.getAll() }),
  );

  app.patch<{ Params: RtpParams; Body: UpdateRtpBody }>(
    "/admin/beacon-power-surge/rtp/:tier",
    { preHandler: options.requireAdmin },
    async (request, reply) => {
      if (!isBeaconPowerSurgeTier(request.params.tier)) {
        return reply.code(404).send({
          error: { code: "UNKNOWN_TIER", message: "Unknown Beacon tier." },
        });
      }

      const body = request.body;
      try {
        assertValidDistributionBps(body.distributedBps);
      } catch {
        return reply.code(400).send({
          error: {
            code: "INVALID_DISTRIBUTION_BPS",
            message: "distributedBps must be an integer from 0 to 10000.",
          },
        });
      }

      if (
        !Number.isInteger(body.expectedVersion) ||
        body.expectedVersion < 1 ||
        typeof body.changeReason !== "string" ||
        body.changeReason.trim().length < 5 ||
        body.changeReason.length > 500
      ) {
        return reply.code(400).send({
          error: {
            code: "INVALID_UPDATE",
            message:
              "Provide expectedVersion and a changeReason of 5–500 characters.",
          },
        });
      }

      try {
        const config = await options.repository.update({
          tier: request.params.tier as BeaconPowerSurgeTier,
          distributedBps: body.distributedBps,
          expectedVersion: body.expectedVersion,
          changeReason: body.changeReason.trim(),
          changedBy: await options.getActorId(request),
        });
        return { data: config };
      } catch (error) {
        if (error instanceof RtpVersionConflictError) {
          return reply.code(409).send({
            error: {
              code: "RTP_VERSION_CONFLICT",
              message: error.message,
            },
          });
        }
        throw error;
      }
    },
  );
}
