import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('returns the sample mean estimate', () => {
  assert.equal(api.bootstrapMean([2, 4, 6], { runs: 100, seed: 7 }).estimate, 4);
});
test('constant samples produce point interval', () => {
  const r = api.bootstrapMean([3, 3, 3], { runs: 100, seed: 7 });
  assert.equal(r.lower, 3);
  assert.equal(r.upper, 3);
});
test('fixed seed is reproducible', () => {
  assert.deepEqual(
    api.bootstrapMean([1, 4, 9], { runs: 200, seed: 123 }),
    api.bootstrapMean([1, 4, 9], { runs: 200, seed: 123 }),
  );
});
test('returns ordered bounds and metadata', () => {
  const r = api.bootstrapMean([1, 4, 9], { runs: 100, seed: 2 });
  assert.ok(r.lower <= r.upper);
  assert.equal(r.seed, 2);
});
test('confidence controls interval percentile', () => {
  const a = api.bootstrapMean([0, 1, 2, 20], { runs: 500, seed: 5, confidence: 0.5 }),
    b = api.bootstrapMean([0, 1, 2, 20], { runs: 500, seed: 5, confidence: 0.95 });
  assert.ok(a.lower >= b.lower && a.upper <= b.upper);
});
test('rejects excessive work', () => {
  assert.throws(() => api.bootstrapMean([1], { runs: 99, seed: 1 }), RangeError);
});
