# @lp-labs/bootstrap-summary

Seeded nonparametric bootstrap confidence interval for the sample mean.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/bootstrap-summary
```

## Working example

```js
import { bootstrapMean } from '@lp-labs/bootstrap-summary';
const result = bootstrapMean([2, 4, 6], { runs: 500, seed: 42 });
if (result.estimate !== 4 || result.lower > result.upper)
  throw new Error('Bootstrap summary invalid');
```

CommonJS: `const api = require('@lp-labs/bootstrap-summary')`.

## Behavior, customization and limits

Resamples n observations with replacement per replicate using xorshift32 and reports percentile bounds of bootstrap means. The interval is a computational summary, not a guarantee of statistical coverage or a substitute for study design.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
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
export declare function bootstrapMean(
  values: readonly number[],
  options: BootstrapOptions,
): BootstrapResult;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
