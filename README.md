# Wardogs Mortar Range Finder

A dependency-free, static field tool for converting a direct map-coordinate distance into metres. It accepts coordinate pairs in the format `x98.43, y113.38` and rounds the calculated direct range to the nearest metre.

## Range calculation

For A (my position) and B (target), the tool calculates:

```text
sqrt((Ax - Bx)^2 + (Ay - By)^2) × 100
```

Multiplying by 100 shifts the map-distance result two decimal places to convert it to metres. For example, A `x97.83, y109.53` and B `x93.15, y92.60` produce **1,756 m** after rounding.

## GitHub Pages deployment

1. Push this repository to GitHub.
2. In the repository, open **Settings** → **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing this site and the `/ (root)` folder, then save.
5. GitHub publishes `index.html` automatically; no build step or dependency installation is required.

## Test

Run the dependency-free check with:

```sh
node test.js
```
