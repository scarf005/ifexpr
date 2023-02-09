/** Result value or a function that returns result value */
type Result<T> = T | (() => T)

/**
 * if expression.
 * @param condition boolean value to evaluate.
 * @param result result value or a function that returns result value.
 */
type IfCond<T> = [condition: boolean | (() => boolean), result: Result<T>]

/** array that is guaranteed to have at least one element. */
type NonEmptyArray<T> = [T, ...T[]]

/** array of if branch and optional else if branches. */
type Branches<T> = NonEmptyArray<IfCond<T>>

/** if function, evaluate to return value. */
const unwrap = <T>(result: Result<T>): T =>
  typeof result === "function" ? (result as () => T)() : result

/**
 * if expression.
 *
 * each branch is evaluated in order. if none matches, last value is returned.
 * if function is provided as result, it is evaluated and returned.
 *
 * @param args [`if`, `else if` (0+), `else`]
 * @returns return value of expression
 *
 * ```
 * const a: string | number = 'first'
 * const b = ifexpr([
 *   [a < 10, () => "this is first"],
 *   [a > 1000, "this is bigger than 1000"],
 *   [a === 1000, "this is 1000"],
 *   "this is smaller than 1000",
 * ])
 * b //=> "this is first"
 * ```
 */
export const ifexpr = <T, Arr extends Branches<T>>(
  args: readonly [...Arr, Result<T>],
): T => {
  const conds = args.slice(0, -1) as Arr
  const elseVal = args.at(-1) as Result<T>
  const res = conds.find(([cond]) => unwrap(cond))?.[1 /* result */] ?? elseVal

  return unwrap(res)
}
