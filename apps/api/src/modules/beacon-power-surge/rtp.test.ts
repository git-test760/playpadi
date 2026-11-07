import { test } from "node:test";
import { strict as assert } from "node:assert";
import {
  calculateRtpSplit,
  createRtpDropSnapshot,
  type RtpConfig,
} from "./rtp.js";

test("50/50 split conserves the pool and rolls indivisible remainder over", () => {
  const result = calculateRtpSplit(101n, 5_000);
  assert.equal(result.distributedUnits, 50n);
  assert.equal(result.rolloverUnits, 51n);
  assert.equal(result.distributedUnits + result.rolloverUnits, 101n);
});

test("zero distribution rolls the entire balance over", () => {
  const result = calculateRtpSplit(250n, 0);
  assert.equal(result.distributedUnits, 0n);
  assert.equal(result.rolloverUnits, 250n);
});

test("100 percent distribution leaves no rollover", () => {
  const result = calculateRtpSplit(250n, 10_000);
  assert.equal(result.distributedUnits, 250n);
  assert.equal(result.rolloverUnits, 0n);
});

test("invalid percentages and negative balances are rejected", () => {
  assert.throws(() => calculateRtpSplit(10n, -1), RangeError);
  assert.throws(() => calculateRtpSplit(10n, 10_001), RangeError);
  assert.throws(() => calculateRtpSplit(10n, 12.5), RangeError);
  assert.throws(() => calculateRtpSplit(-1n, 5_000), RangeError);
});

test("drop snapshot captures its own config version and ratio", () => {
  const config: RtpConfig = {
    tier: "BEACON_STAR",
    distributedBps: 5_000,
    rolloverBps: 5_000,
    version: 3,
    updatedAt: "2026-11-07T00:00:00.000Z",
    updatedBy: "admin-1",
  };
  const snapshot = createRtpDropSnapshot(config, 1_000n);
  assert.equal(snapshot.configVersion, 3);
  assert.equal(snapshot.distributedBps, 5_000);
  assert.equal(snapshot.distributedUnits, 500n);
  assert.equal(snapshot.rolloverUnits, 500n);
});
