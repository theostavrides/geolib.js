# geolib.js
A library of geometric functions for javascript.


## usage
1. Place geolib.js in your project directory.
2. Add the following tag to your html file:

```html
<script type="text/javascript" src="geolib.js"></script>
```
## functions


geolib.convexHull(arr)

Calculates the convex hull of an array of coordinates.
Example:
```javascript
let points = [{"x":21,"y":166},{"x":47,"y":530},{"x":44,"y":448},{"x":515,"y":594},
              {"x":85,"y":413},{"x":502,"y":149},{"x":318,"y":196},{"x":256,"y":307}]
geolib.convexHull(points)
```
