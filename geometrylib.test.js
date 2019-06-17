let { intersections, intersects, convexHull } = require('./geometrylib');


// ----------------- intersections ---------------------

describe('intersections function', () => {
  it('finds all intersections in a set of line segments', () => {
    let arr = [
      [{x:0,y:0}, {x:2,y:4}],
      [{x:1,y:4}, {x:3,y:2}],
      [{x:2,y:7}, {x:4,y:5}],
      [{x:5,y:4}, {x:7,y:8}],
      [{x:6,y:7}, {x:8,y:4}],
      [{x:6,y:1}, {x:8,y:3}],
      [{x:2,y:4}, {x:6,y:2}]
    ];
    expect(intersections(arr)).toBe(2);

  })
})

// ------------------ intersects ------------------

describe('intersects function', () => {
  it('checks if two diagonals intersect', () => {
    let line1 = [{x:10,y:20}, {x:0, y:0}];
    let line2 = [{x:0, y:20}, {x:10, y:0}];
    expect(intersects(line1, line2)).toBe(true);
  })

  it('checks if two diagonals don\'t intersect', () => {
    let line1 = [{x:0,y:20}, {x:20, y:0}];
    let line2 = [{x:20, y:0}, {x:30, y:10}];
    expect(intersects(line1, line2)).toBe(false);
  })

  it('checks if one horizontal and one diagonal intersect', () => {
    let line1 = [{x:0,y:10}, {x:30, y:10}];
    let line2 = [{x:0, y:0}, {x:30, y:40}];
    expect(intersects(line1, line2)).toBe(true);
  })

  it('checks if one horizontal and one diagonal don\'t intersect', () => {
    let line1 = [{x:0,y:10}, {x:30, y:10}];
    let line2 = [{x:0, y:20}, {x:30, y:40}];
    expect(intersects(line1, line2)).toBe(false);
  })

  it('checks if one vertical and one diagonal intersect', () => {
    let line1 = [{x:10, y:0}, {x:10,y:50}];
    let line2 = [{x:0, y: 20}, {x:30, y:10}];
    expect(intersects(line1, line2)).toBe(true);
  })

  it('checks if one vertical and one diagonal don\'t intersect', () => {
    let line1 = [{x:10, y:0}, {x:10,y:50}];
    let line2 = [{x:0, y: 0}, {x:0, y:10}];
    expect(intersects(line1, line2)).toBe(false);
  })

  it('checks if one vertical and one horizontal intersect', () => {
    let line1 = [{x:10, y:0}, {x:10,y:50}];
    let line2 = [{x:0, y: 20}, {x:30, y:20}];
    expect(intersects(line1, line2)).toBe(true);
  })

  it('checks if one vertical and one horizontal don\'t intersect', () => {
    let line1 = [{x:0, y:0}, {x:0,y:50}];
    let line2 = [{x:10, y: 20}, {x:50, y:20}];
    expect(intersects(line1, line2)).toBe(false);
  })
})

// ------------------ convexHull ------------------

describe('convexHull function', () => {
  let points = [{'x':573,'y':345}, {'x':306,'y':441}, {'x':556,'y':332}, {'x':87,'y':113},
                {'x':131,'y':122}, {'x':230,'y':154}, {'x':762,'y':233}, {'x':728,'y':154}];

  let expectedOutput = [{'x':87,'y':113}, {'x':306,'y':441}, {'x':573,'y':345},
                        {'x':762,'y':233}, {'x':728,'y':154}];

  it('generate convex hull from random points', () => {
    expect(convexHull(points)).toStrictEqual(expectedOutput);
  })
});


