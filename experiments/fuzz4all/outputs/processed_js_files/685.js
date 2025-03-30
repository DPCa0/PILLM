class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }
  
  static fromArray(arr) {
    const matrix = new Matrix(arr.length, arr[0].length);
    matrix.map((_, i, j) => arr[i][j]);
    return matrix;
  }

  map(callback) {
    this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return this;
  }

  add(matrix) {
    return this.map((val, i, j) => val + matrix.data[i][j]);
  }

  multiply(matrix) {
    if (matrix instanceof Matrix) {
      return this.map((val, i, j) => {
        return this.data[i].reduce((sum, elm, idx) => sum + elm * matrix.data[idx][j], 0);
      });
    } else {
      return this.map(val => val * matrix);
    }
  }

  static async asyncSum(mat1, mat2) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mat1.add(mat2));
      }, 1000);
    });
  }
}

(async () => {
  const matA = Matrix.fromArray([
    [1, 2],
    [3, 4]
  ]);

  const matB = Matrix.fromArray([
    [5, 6],
    [7, 8]
  ]);

  const sumMatrix = await Matrix.asyncSum(matA, matB);
  print('Sum Matrix:', sumMatrix.data);

  const multipliedMatrix = matA.multiply(matB);
  print('Multiplied Matrix:', multipliedMatrix.data);
})();
