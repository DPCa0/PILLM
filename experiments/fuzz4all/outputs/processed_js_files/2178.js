class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(dim, fn) {
    return new Matrix(
      Array.from({ length: dim[0] }, (_, i) =>
        Array.from({ length: dim[1] }, (_, j) => fn(i, j))
      )
    );
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  static add(a, b) {
    return a.map((val, i, j) => val + b.data[i][j]);
  }

  print() {
    print(this.data.map(row => row.join(', ')).join('\n'));
  }
}

const getRandomInt = (max) => Math.floor(Math.random() * max);

const matrixA = Matrix.from([3, 3], () => getRandomInt(10));
const matrixB = Matrix.from([3, 3], () => getRandomInt(10));

print("Matrix A:");
matrixA.print();

print("Matrix B:");
matrixB.print();

const matrixSum = Matrix.add(matrixA, matrixB);
print("Matrix Sum:");
matrixSum.print();
