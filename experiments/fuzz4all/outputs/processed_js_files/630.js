class Matrix {
  #data;
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(0));
  }

  static fromArray(array) {
    const matrix = new Matrix(array.length, 1);
    array.forEach((val, i) => matrix.#data[i][0] = val);
    return matrix;
  }

  map(callback) {
    this.#data = this.#data.map((row, i) =>
      row.map((val, j) => callback(val, i, j))
    );
    return this;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows)
      throw new Error("Columns of A must match rows of B");
    const result = new Matrix(a.rows, b.cols);
    result.map((_, i, j) =>
      a.#data[i].reduce((sum, elm, k) => sum + elm * b.#data[k][j], 0)
    );
    return result;
  }

  print() {
    console.table(this.#data);
  }
}

 
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) yield i;
}

 
const handler = {
  get: (target, prop) => (prop in target ? target[prop] : `Property ${prop} is not available`)
};

const dynamicObject = new Proxy({}, handler);
dynamicObject.existingProp = 42;

 
const matrixA = new Matrix(2, 3);
matrixA.map((_, i, j) => (i + j));
const matrixB = new Matrix(3, 2);
matrixB.map((_, i, j) => i * j);

print("Matrix A:");
matrixA.print();

print("Matrix B:");
matrixB.print();

const resultMatrix = Matrix.multiply(matrixA, matrixB);
print("Result of Matrix A * Matrix B:");
resultMatrix.print();

print("Dynamic object test:");
print(dynamicObject.existingProp);  
print(dynamicObject.nonExistentProp);  

print("Range generator usage:");
for (const number of range(0, 10,