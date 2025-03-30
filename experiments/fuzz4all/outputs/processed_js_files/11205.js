class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(array) {
    const rows = array.length;
    const cols = Math.max(...array.map(row => row.length));
    const matrix = new Matrix(rows, cols);
    array.forEach((row, i) => row.forEach((val, j) => matrix.data[i][j] = val));
    return matrix;
  }

  map(fn) {
    return new Matrix(this.data.length, this.data[0].length).map((val, i, j) => fn(this.data[i][j], i, j));
  }

  [Symbol.iterator]() {
    let i = 0, j = 0;
    return {
      next: () => {
        if (i < this.data.length) {
          const value = { value: this.data[i][j], done: false };
          j++;
          if (j === this.data[i].length) {
            j = 0;
            i++;
          }
          return value;
        }
        return { value: undefined, done: true };
      }
    };
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Columns of A must match rows of B.');
    const result = new Matrix(a.data.length, b.data[0].length);
    return result.map((_, i, j) => {
      return a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0);
    });
  }
}

async function generateMatrix(rows, cols) {
  const matrix = new Matrix(rows, cols);
  await new Promise(resolve => setTimeout(resolve, 100));  
  matrix.map((_, i, j) => i + j);
  return matrix;
}

(async () => {
  const a = await generateMatrix(3, 2);
  const b = await generateMatrix(2, 3);
  print('Matrix A:', a.data);
  print('Matrix B:', b.data);
  const c = Matrix.multiply(a, b);
  print('A * B:', c.data);
})();
