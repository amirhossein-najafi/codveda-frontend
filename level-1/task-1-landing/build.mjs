import { cp, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { transform } from "esbuild";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

await mkdir(join(dist, "assets"), { recursive: true });

const [css, js, html] = await Promise.all([
  readFile(join(root, "styles.css"), "utf8"),
  readFile(join(root, "script.js"), "utf8"),
  readFile(join(root, "index.html"), "utf8"),
]);

const minCss = await transform(css, { loader: "css", minify: true });
const minJs = await transform(js, { loader: "js", minify: true });

await Promise.all([
  writeFile(join(dist, "styles.css"), minCss.code),
  writeFile(join(dist, "script.js"), minJs.code),
  writeFile(join(dist, "index.html"), html),
  cp(join(root, "assets"), join(dist, "assets"), { recursive: true }),
  cp(join(root, "_headers"), join(dist, "_headers")),
]);

async function bytes(path) {
  return (await stat(path)).size;
}

const rows = [
  ["styles.css", await bytes(join(root, "styles.css")), minCss.code.length],
  ["script.js", await bytes(join(root, "script.js")), minJs.code.length],
];

console.log("Minified landing into dist/");
for (const [name, before, after] of rows) {
  console.log(`${name}: ${before} -> ${after} bytes`);
}
