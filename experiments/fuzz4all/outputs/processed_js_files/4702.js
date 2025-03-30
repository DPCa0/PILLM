class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from = (rows, cols, func) => new Matrix(Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => func(i, j))
  ));

  get = (row, col) => this.data[row][col];
  set = (row, col, value) => this.data[row][col] = value;

  map = (func) => new Matrix(this.data.map((row, i) => row.map((val, j) => func(val, i, j))));

  multiply = (other) => {
    if (this.data[0].length !== other.data.length) throw new Error('Invalid matrix sizes for multiplication');
    return Matrix.from(this.data.length, other.data[0].length, (i, j) =>
      this.data[i].reduce((sum, _, k) => sum + this.get(i, k) * other.get(k, j), 0)
    );
  }

  print = () => print(this.data.map(row => row.join(' ')).join('\n'));
}

 
const MatrixHandler = {
  set: function(obj, prop, value) {
    if (typeof value === 'number' && value >= 0) {
      obj[prop] = value;
      return true;
    }
    throw new Error("Invalid index value");
  }
};

 
function generateRandomMatrix(rows, cols) {
  return Matrix.from(rows, cols, () => Math.floor(Math.random() * 10));
}

const matrixA = generateRandomMatrix(2, 3);
const matrixB = generateRandomMatrix(3, 2);

const proxyMatrixA = new Proxy(matrixA, MatrixHandler);

try {
  proxyMatrixA.set(0, -1, 5);  
} catch (error) {
  console.error(error.message);
}

const resultMatrix = matrixA.multiply(matrixB);

print("Matrix A:");
matrixA.print();

print("\nMatrix B:");
matrixB.print();

print("\nResult Matrix:");
resultMatrix.print();
