let { intersects } = require('./geometrylib');

//line segment intersection
test('checks if two diagonals intersect - true', () => {
  let line1 = [{x:10,y:20}, {x:0, y:0}];
  let line2 = [{x:0, y:20}, {x:10, y:0}];
  expect(intersects(line1, line2)).toBe(true);
})

test('checks if two diagonals intersect - false', () => {
  let line1 = [{x:0,y:20}, {x:20, y:0}];
  let line2 = [{x:20, y:0}, {x:30, y:10}];
  expect(intersects(line1, line2)).toBe(false);
})

test('checks if one horizontal and one diagonal intersect - true', () => {
  let line1 = [{x:0,y:10}, {x:30, y:10}];
  let line2 = [{x:0, y:0}, {x:30, y:40}];
  expect(intersects(line1, line2)).toBe(true);
})

test('checks if one horizontal and one diagonal intersect - false', () => {
  let line1 = [{x:0,y:10}, {x:30, y:10}];
  let line2 = [{x:0, y:20}, {x:30, y:40}];
  expect(intersects(line1, line2)).toBe(false);
})

test('checks if one vertical and one diagonal intersect -true', () => {
  let line1 = [{x:10, y:0}, {x:10,y:50}];
  let line2 = [{x:0, y: 20}, {x:30, y:10}];
  expect(intersects(line1, line2)).toBe(true);
})

test('checks if one vertical and one diagonal intersect - false', () => {
  let line1 = [{x:10, y:0}, {x:10,y:50}];
  let line2 = [{x:0, y: 0}, {x:0, y:10}];
  expect(intersects(line1, line2)).toBe(false);
})

test('checks if one vertical and one horizontal intersect - true', () => {
  let line1 = [{x:10, y:0}, {x:10,y:50}];
  let line2 = [{x:0, y: 20}, {x:30, y:20}];
  expect(intersects(line1, line2)).toBe(true);
})

test('checks if one vertical and one horizontal intersect - false', () => {
  let line1 = [{x:0, y:0}, {x:0,y:50}];
  let line2 = [{x:10, y: 20}, {x:50, y:20}];
  expect(intersects(line1, line2)).toBe(false);
})
