/** array that is guaranteed to have at least one element. */
type NonEmptyArray<T> = [T, ...T[]]

/** Result value or a function that returns result value */
type Result<T> = T | (() => T)

/**
 * if expression.
 * @param condition boolean value to evaluate.
 * @param result result value or a function that returns result value.
 */
type IfBranch<T> = [condition: boolean | (() => boolean), result: Result<T>]

/** array of if branch and optional else if branches. */
type IfBranches<T> = NonEmptyArray<IfBranch<T>>

/** if function, evaluate to return value. */
const unwrap = <T>(result: Result<T>): T =>
  typeof result === "function" ? (result as () => T)() : result

/**
 * if expression.
 *
 * each branch is evaluated in order. if none matches, last value is returned.
 * if function is provided as either condition or result,
 * its evaluation result will be returned.
 *
 * @param args [`if`, `else if` (0+), `else`]
 * @returns return value of expression
 *
 * ```ts
 * const a = 'first'
 * const b: "this is first" = ifexpr(
 *   [a < 10, () => "this is first"],
 *   [a > 1000, "this is bigger than 1000"],
 *   [a === 1000, "this is 1000"],
 *   "this is smaller than 1000",
 * )
 * ```
 */
export const ifexpr = <T, Arr extends IfBranches<T>>(
  ...args: readonly [...Arr, Result<T>]
): T => {
  const conds = args.slice(0, -1) as Arr
  const elseVal = args.at(-1) as Result<T>
  const res = conds.find(([cond]) => unwrap(cond))?.[1 /* result */] ?? elseVal

  return unwrap(res)
}
