# geolib.js
A library of geometric functions for javascript.


## usage
1. Place geolib.js in your project directory.
2. Add the following tag to your html file:

```html
<script type="text/javascript" src="geolib.js"></script>
```
## functions


#### ```Geolib.convexHull()```

Returns the convex hull of an array of coordinates.
Example:
```javascript
let points = [{"x":573,"y":345},{"x":306,"y":441},{"x":556,"y":332},{"x":87,"y":113},
              {"x":131,"y":122},{"x":230,"y":154},{"x":762,"y":233},{"x":728,"y":154}];

Geolib.convexHull(points)

// output: [{"x":87,"y":113},{"x":306,"y":441},{"x":573,"y":345},{"x":762,"y":233},{"x":728,"y":154}]
```
