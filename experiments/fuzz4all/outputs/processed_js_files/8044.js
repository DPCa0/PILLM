class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }
  
  static fromArray(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    const matrix = new Matrix(rows, cols);
    matrix.data = arr;
    return matrix;
  }

  forEach(callback) {
    this.data.forEach((row, i) => row.forEach((value, j) => callback(value, i, j)));
  }

  map(callback) {
    return Matrix.fromArray(this.data.map((row, i) => row.map((value, j) => callback(value, i, j))));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Columns of A must match rows of B.');
    }
    const result = new Matrix(a.data.length, b.data[0].length);
    result.forEach((_, i, j) => {
      result.data[i][j] = a.data[i].reduce((sum, element, index) => sum + element * b.data[index][j], 0);
    });
    return result;
  }
}

 
const a = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);

const b = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const c = Matrix.multiply(a, b);
console.table(c.data);   

 
const transformed = c.map((value) => Math.sin(value));
console.table(transformed.data);   
