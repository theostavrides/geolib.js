// geolib.js

let _lexiSort = function(set){
  return set.sort(function(a,b){
    if (a.x === b.x) {
      return  a.y - b.y;
    }
    return a.x - b.x;
  });
};

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

exports.intersects = function(line1, line2) {
  line1 = _lexiSort(line1);
  line2 = _lexiSort(line2);
  const line1xMin = line1[0].x;
  const line1xMax = line1[1].x;
  const line2xMin = line2[0].x;
  const line2xMax = line2[1].x;
  const xIntersects = line1xMax > line2xMin && line2xMax > line1xMin;
  if (!xIntersects) return false;

  let line1yMin, line1yMax
  if (line1[0].y >= line1[1].y) {
    line1yMin = line1[1].y
    line1yMax = line1[0].y
  } else {
    line1yMin = line1[0].y
    line1yMax = line1[1].y
  }

  let line2yMin, line2yMax
  if (line2[0].y >= line2[1].y) {
    line2yMin = line2[1].y
    line2yMax = line2[0].y
  } else {
    line2yMin = line2[0].y
    line2yMax = line2[1].y
  }
  const yIntersects = line1yMax > line2yMin && line2yMax > line1yMin;
  if (!yIntersects) return false;

  return true
};
