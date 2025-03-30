class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr.map(row => [...row]));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => fn(value, i, j))));
  }

  multiply(other) {
    const [a, b] = [this.data, other.data];
    if (a[0].length !== b.length) throw new Error("Incompatible matrices for multiplication");
    const result = a.map(row => Array(b[0].length).fill(0));
    return new Matrix(result).map((_, i, j) => a[i].reduce((sum, el, k) => sum + el * b[k][j], 0));
  }
}

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const addRandomNoise = matrix => matrix.map(v => v + (Math.random() - 0.5) * 0.1);

const createIdentityMatrix = size => Matrix.fromArray(
  Array(size).fill(0).map((_, i) => Array(size).fill(0).map((_, j) => (i === j ? 1 : 0)))
);

const processMatrix = pipe(
  matrix => matrix.multiply(createIdentityMatrix(matrix.data.length)),
  addRandomNoise
);

const myMatrix = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

const resultMatrix = processMatrix(myMatrix);
print(resultMatrix);
