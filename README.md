# if expression

type safe if expression for deno.

## How to use

```ts
const calcScore = (score: number) =>
  ifexpr([
    [() => score < 60, "F"],
    [() => score < 70, () => "D"],
    [score < 80, "C"],
    [score < 90, () => "B"],
    () => "A",
  ])

const scores = [90, 80, 70, 60, 50]
scores.map(calcScore).join(", ") // => A, B, C, D, F
```

## Benchmark

```sh
deno bench
Check file:///home/scarf/repo/ifexpr/main_bench.ts
cpu: AMD Ryzen 7 4700U with Radeon Graphics
runtime: deno 1.29.1 (x86_64-unknown-linux-gnu)

file:///home/scarf/repo/ifexpr/main_bench.ts
benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
nativeIf     1.98 µs/iter     (1.63 µs … 2.19 µs)   2.05 µs   2.19 µs   2.19 µs
exprIf     151.56 µs/iter (118.25 µs … 617.04 µs) 171.76 µs 201.46 µs  214.3 µs
```

disregard performance, embrace functional programming!
