import {copyFileSync, mkdirSync} from "node:fs";

mkdirSync("public/js", {recursive: true});
copyFileSync(
    "node_modules/@iframe-resizer/child/index.umd.js",
    "public/js/iframe-resizer-child.js",
);