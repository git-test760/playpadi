-- Beacon Power Surge RTP configuration and immutable drop snapshots.
-- Amounts are stored as whole smallest-unit integers (e.g. points or kobo).
-- Release 1 must use non-cash reward units only.

CREATE TABLE IF NOT EXISTS beacon_power_surge_rtp_configs (
  tier TEXT PRIMARY KEY CHECK (
    tier IN ('BEACON_STAR', 'BEACON_GALAXY', 'BEACON_INFINITY')
  ),
  distributed_bps INTEGER NOT NULL DEFAULT 5000
    CHECK (distributed_bps BETWEEN 0 AND 10000),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version >= 1),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_by TEXT NULL
);

INSERT INTO beacon_power_surge_rtp_configs (tier, distributed_bps)
VALUES
  ('BEACON_STAR', 5000),
  ('BEACON_GALAXY', 5000),
  ('BEACON_INFINITY', 5000)
ON CONFLICT (tier) DO NOTHING;

CREATE TABLE IF NOT EXISTS beacon_power_surge_rtp_audit (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  tier TEXT NOT NULL REFERENCES beacon_power_surge_rtp_configs(tier),
  previous_distributed_bps INTEGER NOT NULL
    CHECK (previous_distributed_bps BETWEEN 0 AND 10000),
  new_distributed_bps INTEGER NOT NULL
    CHECK (new_distributed_bps BETWEEN 0 AND 10000),
  previous_version INTEGER NOT NULL,
  new_version INTEGER NOT NULL,
  change_reason TEXT NOT NULL CHECK (char_length(change_reason) BETWEEN 5 AND 500),
  changed_by TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Captures the settings and amounts at the instant a drop is opened.
-- A later admin edit must never change this record.
CREATE TABLE IF NOT EXISTS beacon_power_surge_rtp_drops (
  drop_id TEXT PRIMARY KEY,
  tier TEXT NOT NULL REFERENCES beacon_power_surge_rtp_configs(tier),
  pool_balance_units NUMERIC(30, 0) NOT NULL CHECK (pool_balance_units >= 0),
  distributed_units NUMERIC(30, 0) NOT NULL CHECK (distributed_units >= 0),
  rollover_units NUMERIC(30, 0) NOT NULL CHECK (rollover_units >= 0),
  distributed_bps INTEGER NOT NULL CHECK (distributed_bps BETWEEN 0 AND 10000),
  config_version INTEGER NOT NULL CHECK (config_version >= 1),
  status TEXT NOT NULL CHECK (status IN ('PREPARED', 'COMPLETED', 'CANCELLED')),
  snapshot_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  finalized_at TIMESTAMPTZ NULL,
  CHECK (distributed_units + rollover_units = pool_balance_units)
);

CREATE INDEX IF NOT EXISTS idx_beacon_power_surge_rtp_audit_tier_created
  ON beacon_power_surge_rtp_audit (tier, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_beacon_power_surge_rtp_drops_tier_snapshot
  ON beacon_power_surge_rtp_drops (tier, snapshot_at DESC);
