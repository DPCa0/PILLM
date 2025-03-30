class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr);
  }

  get rows() {
    return this.data.length;
  }

  get cols() {
    return this.data[0].length;
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B");
    let result = Array.from({ length: a.rows }, () => Array(b.cols).fill(0));
    return new Matrix(result.map((row, i) => row.map((_, j) => 
      a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
    )));
  }
}

const asyncMatrixOperation = async (a, b) => {
  await new Promise(resolve => setTimeout(resolve, 1000));  
  return Matrix.multiply(a, b);
};

 
(async () => {
  const a = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
  const b = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);
  
  try {
    const result = await asyncMatrixOperation(a, b);
    print(result.data);
  } catch (error) {
    console.error("Matrix operation failed:", error.message);
  }
})();
