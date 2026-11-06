export interface BootstrapOptions {
  readonly runs: number;
  readonly seed: number;
  readonly confidence?: number;
}
export interface BootstrapResult {
  readonly estimate: number;
  readonly lower: number;
  readonly upper: number;
  readonly runs: number;
  readonly seed: number;
}
function quantile(a: number[], p: number): number {
  const s = [...a].sort((x, y) => x - y),
    i = (s.length - 1) * p,
    k = Math.floor(i);
  return s[k]! * (1 - i + k) + s[Math.min(k + 1, s.length - 1)]! * (i - k);
}
export function bootstrapMean(
  values: readonly number[],
  options: BootstrapOptions,
): BootstrapResult {
  if (
    !Array.isArray(values) ||
    values.length < 1 ||
    values.length > 10000 ||
    values.some((v) => typeof v !== 'number' || !Number.isFinite(v))
  )
    throw new TypeError('Expected 1..10000 finite samples');
  const { runs, seed, confidence = 0.95 } = options;
  if (!Number.isSafeInteger(runs) || runs < 100 || runs > 100000 || runs * values.length > 10000000)
    throw new RangeError('Bootstrap work budget exceeded');
  if (!Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff)
    throw new RangeError('Seed must be an unsigned 32-bit integer');
  if (!Number.isFinite(confidence) || confidence <= 0 || confidence >= 1)
    throw new RangeError('Confidence must be in (0,1)');
  let state = seed >>> 0;
  const random = () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 4294967296;
  };
  const estimate = values.reduce((a, b) => a + b, 0) / values.length,
    means: number[] = [];
  for (let r = 0; r < runs; r++) {
    let sum = 0;
    for (let i = 0; i < values.length; i++) sum += values[Math.floor(random() * values.length)]!;
    means.push(sum / values.length);
  }
  const alpha = (1 - confidence) / 2;
  return { estimate, lower: quantile(means, alpha), upper: quantile(means, 1 - alpha), runs, seed };
}
