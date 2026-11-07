# Beacon Power Surge — RTP Backend Foundation

**Owner lane:** AI 4 / Integration  
**Branch:** `ai-4-integration`  
**Status:** Initial backend module foundation; not production-enabled.

## 1. Agreed behaviour

Each pool has its own independently configurable distribution ratio:

- Beacon Star
- Beacon Galaxy
- Beacon Infinity

Initial default for every tier:

- 50% of the balance at the time of a drop is distributed.
- 50% is retained in that same tier and rolled over.

The setting is stored as integer basis points (50% = 5,000 bps). The rollover percentage is always derived as 10,000 minus the distribution percentage. This prevents the two settings from accidentally totaling more or less than 100%.

There is no contribution split in this design.

## 2. Admin adjustment

Admin-only API:

- `GET /admin/beacon-power-surge/rtp` — read all three tier settings.
- `PATCH /admin/beacon-power-surge/rtp/:tier` — update one tier.

PATCH body:

```json
{
  "distributedBps": 5000,
  "expectedVersion": 1,
  "changeReason": "Approved adjustment after pool review"
}
```

The caller must be authenticated and authorized by the host application's admin pre-handler. The route does not implement its own authentication system.

The update is transactional: lock the tier row, verify the expected version, update the setting, and insert an audit record in the same database transaction. A stale edit returns HTTP 409. Every change requires an actor ID and a reason.

## 3. Drop calculation

The domain service accepts an integer balance in its smallest unit and calculates:

```text
distributed = floor(pool_balance × distributed_bps / 10,000)
rollover    = pool_balance - distributed
```

Any indivisible rounding remainder stays in rollover. Therefore:

```text
distributed + rollover = original pool balance
```

At drop creation, the engine must persist the distribution percentage, configuration version, pool balance, distributed amount and rollover amount in `beacon_power_surge_rtp_drops`. This is an immutable snapshot for that drop. A later admin change affects future drops only.

The module does not choose winners, trigger drop schedules, collect contributions, credit wallets or send notifications. Those are separate services and must call this module through a transaction-safe orchestration layer.

## 4. Database

Migration: `db/migrations/0001_beacon_power_surge_rtp.sql`

It creates:
- Per-tier RTP configuration with 5,000 bps defaults.
- Append-only configuration audit history.
- Immutable per-drop RTP snapshots with a balance conservation constraint.

Amounts are integer smallest units, not floating-point currency values.

## 5. Release and safety boundary

The repository's current Release 1 contract is non-cash. This foundation must therefore be connected only to approved non-cash reward units in Release 1. It does not authorize deposits, withdrawals, cash wallet balances, cash prizes or payment settlement. Any real-money operation requires a separately approved release and its applicable compliance, payment and operational gates.

## 6. Integration checklist

1. Initialize the agreed Fastify/TypeScript API application and PostgreSQL connection pool.
2. Run the migration through the project's migration runner.
3. Register the routes with the real admin authorization pre-handler and actor-ID resolver.
4. Implement the drop orchestrator so the RTP snapshot and pool ledger changes commit atomically.
5. Add integration tests for PostgreSQL transaction rollback, concurrent admin updates, idempotent drop creation and payout/rollover ledger entries.
6. Connect the Loyalty page to a separate read-only public pool summary endpoint; never expose admin configuration or internal ledger details there.

## 7. Acceptance cases

- All three tiers seed to 50% distribution / 50% rollover.
- Updating Star does not change Galaxy or Infinity.
- 0 and 10,000 bps are valid; negative, fractional and greater-than-10,000 values are rejected.
- A stale expected version returns 409.
- Audit insert failure rolls back the settings update.
- A 50/50 split of 101 units distributes 50 and rolls over 51.
- The split always conserves the original balance.
- Existing drop snapshots are not changed by future settings updates.
