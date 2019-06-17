// geolib.js

let _lexiSort = function(set){
  return set.sort(function(a,b){
    if (a.x === b.x) {
      return  a.y - b.y;
    }
    return a.x - b.x;
  });
};

let _lexiSort2 = function(set){

}

let _removeDuplicates = function(arr) {
  let nArr = [];
  nArr.push(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if ((arr[i].x !== nArr[nArr.length - 1].x) || (arr[i].y !== nArr[nArr.length - 1].y)) {
      nArr.push(arr[i])
    }
  }
  return nArr;
}

let _rightTurn = function(arr, mode) {
  let first = arr[0],
      middle = arr[1],
      last = arr[2],
      slope = (last.y - first.y)/(last.x - first.x),
      b = first.y - (slope * first.x),
      y = slope * middle.x + b;

  if (first.y === middle.y && middle.y === last.y) {
    return false;
  }

  if (mode === 1 ? middle.y >= y : middle.y <= y) {
    return true;
  } else {
    return false;
  }
};

//finds the convex hull of an array of points
exports.convexHull = function (set) {
  set = _removeDuplicates(_lexiSort(set.slice()));
  let upperH = [],
      lowerH = [];
      rSet = set.slice().reverse();
  upperH.push(set[0],set[1]);
  lowerH.push(rSet[0],rSet[1]);

  for (let i = 2; i < set.length; i++) {
    upperH.push(set[i]);
    while (upperH.length > 2 && !_rightTurn(upperH.slice(upperH.length - 3),1)) {
      upperH.splice(upperH.length - 2, 1);
    }
  }

  for (let i = 2; i < rSet.length; i++) {
    lowerH.push(rSet[i]);
    while (lowerH.length > 2 && !_rightTurn(lowerH.slice(lowerH.length - 3),-1)) {
      lowerH.splice(lowerH.length - 2, 1);
    }
  }

  lowerH.shift();
  lowerH.pop();
  let hull = upperH.concat(lowerH);
  return hull;
};

// checks if two line segments intersect
exports.intersects = function(line1, line2) {
  const line1xMax = Math.max(line1[0].x, line1[1].x);
  const line1xMin = Math.min(line1[0].x, line1[1].x);
  const line2xMax = Math.max(line2[0].x, line2[1].x);
  const line2xMin = Math.min(line2[0].x, line2[1].x);
  const xIntersects = line1xMax > line2xMin && line2xMax > line1xMin;
  if (!xIntersects) return false;

  const line1yMax = Math.max(line1[0].y, line1[1].y);
  const line1yMin = Math.min(line1[0].y, line1[1].y);
  const line2yMax = Math.max(line2[0].y, line2[1].y);
  const line2yMin = Math.min(line2[0].y, line2[1].y);
  const yIntersects = line1yMax > line2yMin && line2yMax > line1yMin;
  if (!yIntersects) return false;
  return true
};

exports.intersections = function(arr) {
  let Q = _createEventQueue(arr);
  let status = new Status();
  while (Q.length > 0) {
    let event = Q.shift();
    let pointstr = Object.keys(event)[0]; //the point to be examined
    let pointobj = JSON.parse(pointstr);
    let lines = event[pointstr]; //the segments that have the point as an endpoint
    console.log(lines)
    lines.forEach(e => {
      let p1 = e[0];
      let p2 = e[1];
      let top, bottom;
      p1.y > p2.y ? (top = p1, bottom = p2) : (top = p2, bottom = p1 );
      if (p1.y === p2.y) {
        p1.x > p2.x ? (top = p1, bottom = p2) : (top = p1, bottom = p2);
      }

      if (pointstr === JSON.stringify(top)) {
      // if the point is  a 'top', insert segment to status
      status.insert(top);
      } else {
      // if point is a 'bottom', delete segment from status
      status.delete(bottom);
      }
    })
  }
}

class Status{
  constructor(){
    this.data = [];
  }
  insert(){

  }
  delete(){

  }
}



function _createEventQueue(arr){
  // Output Example
  // '{"x":1,"y":4}' represents a unique point on the plane
  // [Array] is a line segment with a point {"x":1,"y":4})
  // Example line segment: [{"x":1,"y":4},{x:10,y:10}]

  // [
  //   { '{"x":1,"y":4}': [ [Array] ] },
  //   { '{"x":2,"y":4}': [ [Array], [Array] ] },
  //   { '{"x":5,"y":4}': [ [Array] ] },
  // ]

  //uniquepoints functions as an index reference for dataOut
  let uniquePoints = [];
  let dataOut = [];

  arr.forEach(line => {
    let p1 = JSON.stringify(line[0]);
    let p2 = JSON.stringify(line[1]);

    // check if p1 or p2 are in uniquePoints
    let p1index = uniquePoints.indexOf(p1);
    let p2index = uniquePoints.indexOf(p2);

    //if not, add the point to uniquepoints
    //& add the point and corresponding line segment to dataOut
    if (p1index === -1){
      uniquePoints.push(p1);
      let pointData = {};
      pointData[p1] = [line];
      dataOut.push(pointData);
    }
    if (p2index === -1){
      uniquePoints.push(p2)
      let pointData = {};
      pointData[p2] = [line];
      dataOut.push(pointData)
    }

    //if p1 or p2 are in uniquepoints, find the correct point in dataOut
    //and push the line to the array
    if (p1index > -1){
      dataOut[p1index][p1].push(line)
    }
    if (p2index > -1){
      dataOut[p2index][p2].push(line)
    }

  });

  //sort the output from biggest y to lowest y, if y same, sort by x
  return dataOut.sort(function(a,b){
    a = JSON.parse(Object.keys(a)[0]);
    b = JSON.parse(Object.keys(b)[0]);
    if (a.y === b.y) {
      return  a.x - b.x;
    }
    return b.y - a.y;
  });

}






