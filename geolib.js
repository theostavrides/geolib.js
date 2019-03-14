// geolib.js

let Geolib = (function(){
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

  let convexHull = function (set) {
    set = _removeDuplicates(_lexiSort(set.slice()));
    function rightTurn(arr, mode) {
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

    let upperH = [],
        lowerH = [];
        rSet = set.slice().reverse();
    upperH.push(set[0],set[1]);
    lowerH.push(rSet[0],rSet[1]);

    for (let i = 2; i < set.length; i++) {
      upperH.push(set[i]);
      while (upperH.length > 2 && !rightTurn(upperH.slice(upperH.length - 3),1)) {
        upperH.splice(upperH.length - 2, 1);
      }
    }

    for (let i = 2; i < rSet.length; i++) {
      lowerH.push(rSet[i]);
      while (lowerH.length > 2 && !rightTurn(lowerH.slice(lowerH.length - 3),-1)) {
        lowerH.splice(lowerH.length - 2, 1);
      }
    }

    lowerH.shift();
    lowerH.pop();
    let hull = upperH.concat(lowerH);
    return hull;
  };

  return {
    convexHull: convexHull
  }

})();;





