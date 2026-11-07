import type { Pool } from "pg";
import {
  BEACON_POWER_SURGE_TIERS,
  RtpVersionConflictError,
  type BeaconPowerSurgeTier,
  type RtpConfig,
  type RtpConfigUpdate,
} from "./rtp.js";

interface RtpConfigRow {
  tier: BeaconPowerSurgeTier;
  distributed_bps: number;
  version: number;
  updated_at: Date;
  updated_by: string | null;
}

export interface RtpConfigRepository {
  getAll(): Promise<RtpConfig[]>;
  get(tier: BeaconPowerSurgeTier): Promise<RtpConfig | null>;
  update(input: RtpConfigUpdate): Promise<RtpConfig>;
}

function mapRow(row: RtpConfigRow): RtpConfig {
  return {
    tier: row.tier,
    distributedBps: row.distributed_bps,
    rolloverBps: 10_000 - row.distributed_bps,
    version: row.version,
    updatedAt: row.updated_at.toISOString(),
    updatedBy: row.updated_by,
  };
}

/**
 * PostgreSQL implementation. The settings update and audit record are written
 * in one transaction, with a row lock and optimistic version check.
 */
export class PostgresRtpConfigRepository
  implements RtpConfigRepository
{
  constructor(private readonly pool: Pool) {}

  async getAll(): Promise<RtpConfig[]> {
    const result = await this.pool.query<RtpConfigRow>(
      `SELECT tier, distributed_bps, version, updated_at, updated_by
       FROM beacon_power_surge_rtp_configs
       ORDER BY CASE tier
         WHEN 'BEACON_STAR' THEN 1
         WHEN 'BEACON_GALAXY' THEN 2
         WHEN 'BEACON_INFINITY' THEN 3
       END`,
    );
    return result.rows.map(mapRow);
  }

  async get(tier: BeaconPowerSurgeTier): Promise<RtpConfig | null> {
    const result = await this.pool.query<RtpConfigRow>(
      `SELECT tier, distributed_bps, version, updated_at, updated_by
       FROM beacon_power_surge_rtp_configs
       WHERE tier = $1`,
      [tier],
    );
    return result.rows[0] ? mapRow(result.rows[0]) : null;
  }

  async update(input: RtpConfigUpdate): Promise<RtpConfig> {
    const client = await this.pool.connect();

    try {
      await client.query("BEGIN");

      const currentResult = await client.query<RtpConfigRow>(
        `SELECT tier, distributed_bps, version, updated_at, updated_by
         FROM beacon_power_surge_rtp_configs
         WHERE tier = $1
         FOR UPDATE`,
        [input.tier],
      );
      const current = currentResult.rows[0];

      if (!current || current.version !== input.expectedVersion) {
        throw new RtpVersionConflictError();
      }

      const nextVersion = current.version + 1;
      const updatedResult = await client.query<RtpConfigRow>(
        `UPDATE beacon_power_surge_rtp_configs
         SET distributed_bps = $2,
             version = $3,
             updated_at = NOW(),
             updated_by = $4
         WHERE tier = $1
         RETURNING tier, distributed_bps, version, updated_at, updated_by`,
        [
          input.tier,
          input.distributedBps,
          nextVersion,
          input.changedBy,
        ],
      );

      await client.query(
        `INSERT INTO beacon_power_surge_rtp_audit
           (tier, previous_distributed_bps, new_distributed_bps,
            previous_version, new_version, change_reason, changed_by)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          input.tier,
          current.distributed_bps,
          input.distributedBps,
          current.version,
          nextVersion,
          input.changeReason,
          input.changedBy,
        ],
      );

      await client.query("COMMIT");
      return mapRow(updatedResult.rows[0]);
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

export const DEFAULT_RTP_TIERS = BEACON_POWER_SURGE_TIERS;
