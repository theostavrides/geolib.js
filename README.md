# geolib.js
A library of geometric functions for javascript.

## functions


##### ```Geolib.convexHull(arr)```

Returns the convex hull of an array of coordinates.
Output is sorted clockwise from leftmost point.

Example:
```javascript
let points = [{"x":573,"y":345},{"x":306,"y":441},{"x":556,"y":332},{"x":87,"y":113},
              {"x":131,"y":122},{"x":230,"y":154},{"x":762,"y":233},{"x":728,"y":154}];

Geolib.convexHull(points)

// output: [{"x":87,"y":113},{"x":306,"y":441},{"x":573,"y":345},{"x":762,"y":233},{"x":728,"y":154}]
```
