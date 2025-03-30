class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr.map(row => [...row]));
  }

  get rows() {
    return this.data.length;
  }

  get cols() {
    return this.data[0].length;
  }

  static add(m1, m2) {
    if (m1.rows !== m2.rows || m1.cols !== m2.cols) {
      throw new Error("Matrices dimensions must match");
    }
    let result = m1.data.map((row, i) => row.map((val, j) => val + m2.data[i][j]));
    return new Matrix(result);
  }

  static multiply(m1, m2) {
    if (m1.cols !== m2.rows) {
      throw new Error("Matrices dimensions must match for multiplication");
    }
    let result = Array.from({ length: m1.rows }, () => Array(m2.cols).fill(0));
    result = result.map((row, i) =>
      row.map((_, j) =>
        m1.data[i].reduce((sum, val, k) => sum + val * m2.data[k][j], 0)
      )
    );
    return new Matrix(result);
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

(async function() {
  const m1 = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
  const m2 = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);
  
  print("Matrix 1:");
  print(m1.toString());

  print("\nMatrix 2:");
  print(m2.toString());

  try {
    const m3 = Matrix.multiply(m1, m2);
    print("\nMatrix 1 * Matrix 2:");
    print(m3.toString());
  } catch (err) {
    console.error(err);
  }

  const m4 = Matrix.fromArray([[1, 1], [1, 1]]);
  const m5 = Matrix.fromArray([[2, 2], [2, 2]]);

  print("\nMatrix 4:");
  print(m4.toString());

  print("\nMatrix 5:");
  print(m5.toString());

  try {