class Matrix {
  constructor(data) {
    this.data = data;
  }
  
  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error("Matrices cannot be multiplied");
    }
    
    return new Matrix(a.data.map(row =>
      b.data[0].map((_, i) =>
        row.reduce((acc, val, j) => acc + val * b.data[j][i], 0)
      )
    ));
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    return {
      next: () => {
        if (row === this.data.length) return { done: true };
        const value = this.data[row][col];
        if (col === this.data[row].length - 1) {
          col = 0;
          row++;
        } else {
          col++;
        }
        return { value, done: false };
      }
    };
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

(async function() {
  const A = new Matrix([[1, 2], [3, 4]]);
  const B = new Matrix([[5, 6], [7, 8]]);
  const C = Matrix.multiply(A, B);

  print('Matrix A:');
  print(A.toString());
  print('\nMatrix B:');
  print(B.toString());
  print('\nMatrix C (A * B):');
  print(C.toString());

  for await (let value of C) {
    print(`Element: ${value}`);
  }

})();
