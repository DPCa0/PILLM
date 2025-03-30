const createMatrix = (rows, cols, fill) =>
  Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));

const matrix = createMatrix(5, 5, 0);

const applyFunctionToMatrix = (matrix, fn) =>
  matrix.map((row, rowIndex) => row.map((val, colIndex) => fn(val, rowIndex, colIndex)));

const filledMatrix = applyFunctionToMatrix(matrix, (val, row, col) => row + col);

const flattenMatrix = (matrix) =>
  matrix.reduce((acc, row) => [...acc, ...row], []);

const flatArray = flattenMatrix(filledMatrix);

const sumOfArray = flatArray.reduce((acc, num) => acc + num, 0);

const asyncSum = async (array) => {
  const promises = array.map(async (num) => num * 2);
  const doubledArray = await Promise.all(promises);
  return doubledArray.reduce((acc, num) => acc + num, 0);
};

(async () => {
  const asyncResult = await asyncSum(flatArray);
  print(`Sum: ${sumOfArray}, Async Sum: ${asyncResult}`);
})();
