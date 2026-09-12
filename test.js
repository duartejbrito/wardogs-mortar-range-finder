"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const { EXAMPLE, parseCoordinate, calculateDistance } = require("./script.js");

assert.deepEqual(parseCoordinate("x98.43, y113.38"), { x: 98.43, y: 113.38 });
assert.deepEqual(parseCoordinate(" X -1.5 , Y +.25 "), { x: -1.5, y: 0.25 });
assert.match(parseCoordinate("").error, /Enter coordinates/);
assert.match(parseCoordinate("98.43, 113.38").error, /Use x followed/);
assert.match(parseCoordinate("x1, y2 metres").error, /Use x followed/);

const myPosition = parseCoordinate(EXAMPLE.myPosition);
const targetPosition = parseCoordinate(EXAMPLE.targetPosition);
const result = calculateDistance(myPosition, targetPosition, EXAMPLE.metresPerUnit);
assert.equal(Math.round(result.metres), 412);
assert.ok(Math.abs(result.mapDistance - 5.842302628245133) < 1e-12);

const markup = fs.readFileSync("index.html", "utf8");
for (const inputId of ["my-position", "target-position", "metres-per-unit"]) {
  assert.match(markup, new RegExp(`id="${inputId}-error"`));
}

console.log("Parser, range-calculation, and error-region tests passed.");
