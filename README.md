# Wardogs Mortar Range Finder

A dependency-free, static field tool for converting a direct map-coordinate distance into metres. It accepts coordinate pairs in the format `x98.43, y113.38`, shows the X/Y deltas and map-distance calculation, and rounds the result to the nearest metre.

## Calibration

The default calibration is **70.52014012559863 metres per map unit**. It is derived from the supplied reference positions:

- A: `x98.43, y113.38`
- B: `x94.53, y109.03`
- Euclidean map distance: `sqrt((-3.9)^2 + (-4.35)^2) = 5.842302628245133` map units
- Calibration: `412 / 5.842302628245133 = 70.52014012559863` metres per map unit

Change **Metres per map unit** for a map with a different scale.

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
