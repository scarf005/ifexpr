# if expression

type safe if expression for deno.

## How to use

```ts
import { ifexpr } from "https://deno.land/x/ifexpr/mod.ts"

const calcScore = (score: number) =>
  ifexpr(
    [() => score < 60, "F"],
    [() => score < 70, () => "D"],
    [score < 80, "C"],
    [score < 90, () => "B"],
    () => "A",
  )

const scores = [90, 80, 70, 60, 50]
scores.map(calcScore).join(", ") // => A, B, C, D, F
```

## Benchmark

```sh
$ deno bench
Check file:///home/scarf/repo/ifexpr/mod_bench.ts
cpu: AMD Ryzen 5 5600G with Radeon Graphics
runtime: deno 1.30.0 (x86_64-unknown-linux-gnu)

file:///home/scarf/repo/ifexpr/mod_bench.ts
benchmark      time (avg)             (min … max)       p75       p99      p995
------------------------------------------------- -----------------------------
nativeIf     1.43 µs/iter     (1.36 µs … 1.93 µs)   1.39 µs   1.93 µs   1.93 µs
exprIf     118.72 µs/iter  (86.88 µs … 356.44 µs) 142.18 µs 303.01 µs  316.7 µs
```

consider using `ifexpr` only to non performance critical code.

## About

### License

`ifexpr` is released under the MIT License. see [LICENSE](LICENSE) for details.

### Contributing

see [CONTRIBUTING.md](CONTRIBUTING.md)
