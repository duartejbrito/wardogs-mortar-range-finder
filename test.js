"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const { METRES_PER_MAP_UNIT, parseCoordinate, calculateDistance } = require("./script.js");

assert.deepEqual(parseCoordinate("x98.43, y113.38"), { x: 98.43, y: 113.38 });
assert.deepEqual(parseCoordinate(" X -1.5 , Y +.25 "), { x: -1.5, y: 0.25 });
assert.match(parseCoordinate("").error, /Enter coordinates/);
assert.match(parseCoordinate("98.43, 113.38").error, /Use x followed/);
assert.match(parseCoordinate("x1, y2 metres").error, /Use x followed/);

const myPosition = parseCoordinate("x98.43, y113.38");
const targetPosition = parseCoordinate("x94.53, y109.03");
const result = calculateDistance(myPosition, targetPosition);
assert.equal(Math.round(result.metres), 584);
assert.equal(METRES_PER_MAP_UNIT, 100);

const secondResult = calculateDistance(
  parseCoordinate("x97.83, y109.53"),
  parseCoordinate("x93.15, y92.60")
);
assert.equal(Math.round(secondResult.metres), 1756);

const markup = fs.readFileSync("index.html", "utf8");
for (const inputId of ["my-position", "target-position"]) {
  assert.match(markup, new RegExp(`id="${inputId}-error"`));
}
const script = fs.readFileSync("script.js", "utf8");
assert.doesNotMatch(script, /getElementById\(`\$\{input\.id\}-error`\)/);
assert.match(script, /input\.addEventListener\("click"/);
assert.doesNotMatch(markup, /metres-per-unit|swap-positions|reset-example|calculation-details/);

console.log("Parser, range-calculation, and simplified-interface tests passed.");
