import { ifexpr } from "./mod.ts"

const tryGuard = (guard: (n: number) => string) => {
  for (let i = 0; i < 3000; i++) {
    guard(i)
  }
}

Deno.bench(function nativeIf() {
  const guard = (a: number | "first") => {
    if (a === "first") {
      return "this is first"
    } else if (a > 1500) {
      return "this is bigger than 1500"
    } else if (a === 1500) {
      return "this is 1500"
    } else {
      return "this is smaller than 1500"
    }
  }
  tryGuard(guard)
})
Deno.bench(function exprIf() {
  const guard = (a: number | "first") =>
    ifexpr(
      [a === "first", "this is first"],
      [a > 1500, "this is bigger than 1500"],
      [a === 1500, "this is 1500"],
      "this is smaller than 1500",
    )
  tryGuard(guard)
})
