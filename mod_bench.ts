import { ifexpr } from "./mod.ts"

Deno.bench(function nativeIf() {
  const guard = (a: number | "first") => {
    if (a === "first") {
      return "this is first"
    } else if (a > 1000) {
      return "this is bigger than 1000"
    } else if (a === 1000) {
      return "this is 1000"
    } else {
      return "this is smaller than 1000"
    }
  }
  for (let i = 0; i < 2000; i++) {
    guard(i)
  }
})

Deno.bench(function exprIf() {
  const guard = (a: number | "first") =>
    ifexpr(
      [a === "first", "this is first"],
      [a > 1000, "this is bigger than 1000"],
      [a === 1000, "this is 1000"],
      "this is smaller than 1000",
    )
  for (let i = 0; i < 2000; i++) {
    guard(i)
  }
})
