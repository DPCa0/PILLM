 
class Matrix {
  #matrix;
  constructor(rows, cols, fillValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.#matrix = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
  }

   
  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.rows) {
          const value = { value: this.#matrix[row][col], done: false };
          col = (col + 1) % this.cols;
          if (col === 0) row++;
          return value;
        } else {
          return { done: true };
        }
      }
    };
  }

   
  *entries() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        yield [row, col, this.#matrix[row][col]];
      }
    }
  }

   
  static async multiplyAsync(m1, m2) {
    if (m1.cols !== m2.rows) throw new Error('Incompatible matrices');

    const result = new Matrix(m1.rows, m2.cols);
    await Promise.all(
      result.entries().map(async ([row, col]) => {
        let sum = 0;
        for (let k = 0; k < m1.cols; k++) {
          sum += m1.#matrix[row][k] * m2.#matrix[k][col];
        }
        result.#matrix[row][col] = sum;
      })
    );
    return result;
  }

  toString() {
    return this.#matrix.map(row => row.join(' ')).join('\n');
  }
}

 
(async () => {
  const a = new Matrix(2, 3, 1);
  const b = new Matrix(3, 2, 2);
  try {
    const c = await Matrix.multiplyAsync(a, b);
    print('Matrix A:\n' + a);
    print('Matrix B:\n' + b);
    print('Result of A * B:\n' + c);
  } catch