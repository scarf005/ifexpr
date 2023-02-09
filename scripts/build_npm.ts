// ex. scripts/build_npm.ts
import { build, emptyDir } from "https://deno.land/x/dnt@0.33.1/mod.ts"

await emptyDir("./npm")

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: "@scarf005/ifexpr",
    version: Deno.args[0],
    description: "type safe if expression with arbitrary number of else branches.",
    license: "MIT",
    repository: {
      type: "git",
      url: "git+https://github.com/scarf005/ifexpr.git",
    },
    bugs: {
      url: "https://github.com/scarf005/ifexpr/issues",
    },
  },
})

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE")
Deno.copyFileSync("README.md", "npm/README.md")
