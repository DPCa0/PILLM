class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error("Matrix dimensions do not match for multiplication.");
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) => 
      a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
    );
  }

  map(callback) {
    this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return this;
  }

  print() {
    console.table(this.data);
    return this;
  }
}

const asyncMatrixOperation = async () => {
  try {
    let A = new Matrix(2, 3, 1);
    let B = new Matrix(3, 2, 2);

    await Promise.resolve()
      .then(() => {
        print("Matrix A:");
        A.print();
      })
      .then(() => {
        print("Matrix B:");
        B.print();
      });

    let C = Matrix.multiply(A, B);
    print("A * B = C:");
    C.print();

  } catch (error) {
    console.error("Error:", error);
  }
};

(async () => await asyncMatrixOperation())();
