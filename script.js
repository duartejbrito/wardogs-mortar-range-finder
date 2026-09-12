(function (root) {
  "use strict";

  const EXAMPLE = Object.freeze({
    myPosition: "x98.43, y113.38",
    targetPosition: "x94.53, y109.03",
    metresPerUnit: 70.52014012559863
  });

  function parseCoordinate(value) {
    const text = String(value).trim();
    if (!text) {
      return { error: "Enter coordinates in the format x98.43, y113.38." };
    }

    const match = /^x\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))\s*,\s*y\s*([+-]?(?:\d+(?:\.\d*)?|\.\d+))$/i.exec(text);
    if (!match) {
      return { error: "Use x followed by a number, comma, then y followed by a number (for example, x98.43, y113.38)." };
    }

    const x = Number(match[1]);
    const y = Number(match[2]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return { error: "Both X and Y must be finite numbers." };
    }
    return { x, y };
  }

  function calculateDistance(myPosition, targetPosition, metresPerUnit) {
    const deltaX = targetPosition.x - myPosition.x;
    const deltaY = targetPosition.y - myPosition.y;
    const mapDistance = Math.hypot(deltaX, deltaY);
    return { deltaX, deltaY, mapDistance, metres: mapDistance * metresPerUnit };
  }

  const api = { EXAMPLE, parseCoordinate, calculateDistance };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (!root.document) {
    return;
  }

  const form = document.getElementById("range-form");
  const myInput = document.getElementById("my-position");
  const targetInput = document.getElementById("target-position");
  const calibrationInput = document.getElementById("metres-per-unit");
  const rangeValue = document.getElementById("range-value");
  const resultStatus = document.getElementById("result-status");
  const details = document.getElementById("calculation-details");

  function setError(input, message) {
    input.setAttribute("aria-invalid", message ? "true" : "false");
    document.getElementById(`${input.id}-error`).textContent = message || "";
  }

  function formatNumber(value, decimals) {
    return value.toLocaleString(undefined, { maximumFractionDigits: decimals });
  }

  function displayResult(result, metresPerUnit) {
    rangeValue.textContent = String(Math.round(result.metres));
    resultStatus.textContent = `Direct range at ${formatNumber(metresPerUnit, 4)} metres per map unit.`;
    document.getElementById("delta-x").textContent = `${formatNumber(result.deltaX, 4)} units`;
    document.getElementById("delta-y").textContent = `${formatNumber(result.deltaY, 4)} units`;
    document.getElementById("map-distance").textContent = `${formatNumber(result.mapDistance, 4)} units`;
    document.getElementById("formula").textContent =
      `sqrt(${formatNumber(result.deltaX, 4)}² + ${formatNumber(result.deltaY, 4)}²) × ${formatNumber(metresPerUnit, 4)}`;
    details.hidden = false;
  }

  function calculate() {
    const myPosition = parseCoordinate(myInput.value);
    const targetPosition = parseCoordinate(targetInput.value);
    const metresPerUnit = Number(calibrationInput.value);
    setError(myInput, myPosition.error);
    setError(targetInput, targetPosition.error);
    setError(calibrationInput, !Number.isFinite(metresPerUnit) || metresPerUnit <= 0
      ? "Enter a calibration greater than zero."
      : "");

    if (myPosition.error || targetPosition.error || !Number.isFinite(metresPerUnit) || metresPerUnit <= 0) {
      rangeValue.textContent = "—";
      resultStatus.textContent = "Correct the highlighted fields, then calculate.";
      details.hidden = true;
      return false;
    }

    displayResult(calculateDistance(myPosition, targetPosition, metresPerUnit), metresPerUnit);
    return true;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });
  document.getElementById("swap-positions").addEventListener("click", function () {
    const original = myInput.value;
    myInput.value = targetInput.value;
    targetInput.value = original;
    calculate();
  });
  document.getElementById("reset-example").addEventListener("click", function () {
    myInput.value = EXAMPLE.myPosition;
    targetInput.value = EXAMPLE.targetPosition;
    calibrationInput.value = String(EXAMPLE.metresPerUnit);
    calculate();
  });
  calibrationInput.addEventListener("change", calculate);
}(typeof globalThis !== "undefined" ? globalThis : this));
