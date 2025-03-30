class Matrix {
  #data;
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static random(rows, cols, maxVal = 1) {
    const matrix = new Matrix(rows, cols);
    matrix.mapInPlace(() => Math.random() * maxVal);
    return matrix;
  }

  mapInPlace(fn) {
    this.#data = this.#data.map((row, i) => row.map((val, j) => fn(val, i, j)));
  }

  static add(matA, matB) {
    if (matA.rows !== matB.rows || matA.cols !== matB.cols) {
      throw new Error('Matrix dimensions must match');
    }
    const result = new Matrix(matA.rows, matA.cols);
    result.mapInPlace((_, i, j) => matA.#data[i][j] + matB.#data[i][j]);
    return result;
  }

  print() {
    console.table(this.#data);
  }
}

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const logWithTimestamp = (msg) => print(`[${new Date().toISOString()}]: ${msg}`);

const createAndLogMatrices = pipe(
  () => Matrix.random(3, 3, 10),
  (mat) => {
    mat.print();
    return mat;
  },
  (mat) => {
    const anotherMat = Matrix.random(3, 3, 10);
    const sumMat = Matrix.add(mat, anotherMat);
    logWithTimestamp('Summed matrices:');
    sumMat.print();
  }
);

createAndLogMatrices();
