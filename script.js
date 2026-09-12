(function (root) {
  "use strict";

  const METRES_PER_MAP_UNIT = 100;

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

  function calculateDistance(myPosition, targetPosition) {
    const deltaX = targetPosition.x - myPosition.x;
    const deltaY = targetPosition.y - myPosition.y;
    const mapDistance = Math.hypot(deltaX, deltaY);
    return { metres: mapDistance * METRES_PER_MAP_UNIT };
  }

  const api = { METRES_PER_MAP_UNIT, parseCoordinate, calculateDistance };
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  if (!root.document) {
    return;
  }

  const form = document.getElementById("range-form");
  const myInput = document.getElementById("my-position");
  const targetInput = document.getElementById("target-position");
  const myPositionError = document.getElementById("my-position-error");
  const targetPositionError = document.getElementById("target-position-error");
  const rangeValue = document.getElementById("range-value");

  function setError(input, errorElement, message) {
    input.setAttribute("aria-invalid", message ? "true" : "false");
    errorElement.textContent = message || "";
  }

  function displayResult(result) {
    rangeValue.textContent = String(Math.round(result.metres));
  }

  function calculate() {
    const myPosition = parseCoordinate(myInput.value);
    const targetPosition = parseCoordinate(targetInput.value);
    setError(myInput, myPositionError, myPosition.error);
    setError(targetInput, targetPositionError, targetPosition.error);

    if (myPosition.error || targetPosition.error) {
      rangeValue.textContent = "—";
      return false;
    }

    displayResult(calculateDistance(myPosition, targetPosition));
    return true;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    calculate();
  });
  [myInput, targetInput].forEach(function (input) {
    input.addEventListener("focus", function () {
      input.select();
    });
    input.addEventListener("click", function () {
      input.select();
    });
  });
}(typeof globalThis !== "undefined" ? globalThis : this));
