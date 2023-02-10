import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts"
import { ifexpr } from "./mod.ts"

/**
 * function condition -> literal result
 * function condition -> function result
 * literal condition -> literal result
 * literal condition -> function result
 */
const calcScore = (score: number) =>
  ifexpr(
    [() => score < 60, "F"],
    [() => score < 70, () => "D"],
    [score < 80, "C"],
    [score < 90, () => "B"],
    () => "A",
  )

// deno-fmt-ignore
const scores = [
  [0, "F"], [59, "F"], [60, "D"], [69, "D"],
  [70, "C"], [79, "C"], [80, "B"], [89, "B"],
  [90, "A"], [100, "A"],
] as const
scores.forEach(([score, expected]) =>
  Deno.test(`${score} -> ${expected}`, () =>
    assertEquals(calcScore(score), expected))
)

Deno.test(function resultTest() {
  const literalResult = ifexpr([false, ""], "return value")
  const functionResult = ifexpr([false, ""], () => "return value")
  assertEquals(literalResult, functionResult)
})

const guard = (a: number | string) =>
  ifexpr(
    [a === "first", "this is first"],
    [a > 1000, "this is bigger than 1000"],
    [a === 1000, "this is 1000"],
    [a < 1000, "this is smaller than 1000"],
    `this is a string called ${a}`,
  )

const guardTestCases = [
  ["first", "this is first"],
  [0, "this is smaller than 1000"],
  [2000, "this is bigger than 1000"],
  [1000, "this is 1000"],
  ["hello", "this is a string called hello"],
] as const

Deno.test(function ifexprTest() {
  for (const [a, expected] of guardTestCases) {
    assertEquals(guard(a), expected)
  }
})
