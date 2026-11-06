import * as api from '@lp-labs/bootstrap-summary';
import { bootstrapMean } from '@lp-labs/bootstrap-summary';
const result = bootstrapMean([2, 4, 6], { runs: 500, seed: 42 });
if (result.estimate !== 4 || result.lower > result.upper)
  throw new Error('Bootstrap summary invalid');
// @ts-expect-error invalid argument must be rejected by declarations
api.bootstrapMean('not an array', { runs: 100, seed: 1 });
