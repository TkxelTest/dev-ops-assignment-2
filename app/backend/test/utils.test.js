// test/utils.test.js
const { addNumbers } = require('../utils');

test('adds two numbers correctly', () => {
  expect(addNumbers(5, 3)).toBe(8);
});
