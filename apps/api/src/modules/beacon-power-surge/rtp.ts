export const BEACON_POWER_SURGE_TIERS = [
  "BEACON_STAR",
  "BEACON_GALAXY",
  "BEACON_INFINITY",
] as const;

export type BeaconPowerSurgeTier =
  (typeof BEACON_POWER_SURGE_TIERS)[number];

export const RTP_BASIS_POINTS = 10_000;
export const DEFAULT_DISTRIBUTION_BPS = 5_000;

export interface RtpConfig {
  tier: BeaconPowerSurgeTier;
  distributedBps: number;
  rolloverBps: number;
  version: number;
  updatedAt: string;
  updatedBy: string | null;
}

export interface RtpConfigUpdate {
  tier: BeaconPowerSurgeTier;
  distributedBps: number;
  expectedVersion: number;
  changeReason: string;
  changedBy: string;
}

export interface RtpSplit {
  poolBalanceUnits: bigint;
  distributedUnits: bigint;
  rolloverUnits: bigint;
  distributedBps: number;
  rolloverBps: number;
}

/** Reject unknown tiers instead of silently creating a new pool. */
export function isBeaconPowerSurgeTier(
  value: string,
): value is BeaconPowerSurgeTier {
  return (BEACON_POWER_SURGE_TIERS as readonly string[]).includes(value);
}

/** Percentages are stored as integer basis points to avoid float rounding. */
export function assertValidDistributionBps(value: number): void {
  if (
    !Number.isInteger(value) ||
    value < 0 ||
    value > RTP_BASIS_POINTS
  ) {
    throw new RangeError(
      "distributedBps must be an integer between 0 and 10000",
    );
  }
}

/**
 * Split a pool balance expressed in its smallest indivisible unit
 * (for example, points or kobo). Any rounding remainder stays in rollover,
 * ensuring distributed + rollover always equals the original balance.
 */
export function calculateRtpSplit(
  poolBalanceUnits: bigint,
  distributedBps: number,
): RtpSplit {
  if (poolBalanceUnits < 0n) {
    throw new RangeError("poolBalanceUnits cannot be negative");
  }

  assertValidDistributionBps(distributedBps);

  const distributedUnits =
    (poolBalanceUnits * BigInt(distributedBps)) /
    BigInt(RTP_BASIS_POINTS);
  const rolloverUnits = poolBalanceUnits - distributedUnits;

  return {
    poolBalanceUnits,
    distributedUnits,
    rolloverUnits,
    distributedBps,
    rolloverBps: RTP_BASIS_POINTS - distributedBps,
  };
}

/**
 * Capture the configuration used by a drop. Persist this snapshot with the
 * drop record; later admin changes must never rewrite an existing drop.
 */
export function createRtpDropSnapshot(
  config: RtpConfig,
  poolBalanceUnits: bigint,
): RtpSplit & {
  tier: BeaconPowerSurgeTier;
  configVersion: number;
} {
  const split = calculateRtpSplit(
    poolBalanceUnits,
    config.distributedBps,
  );

  return {
    tier: config.tier,
    configVersion: config.version,
    ...split,
  };
}

export class RtpVersionConflictError extends Error {
  constructor() {
    super("RTP settings changed since they were loaded. Refresh and retry.");
    this.name = "RtpVersionConflictError";
  }
}
