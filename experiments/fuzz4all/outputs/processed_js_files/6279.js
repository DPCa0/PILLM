class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Columns of A must match rows of B');
    }
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) => {
      return a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0);
    });
  }

  map(fn) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => fn(value, i, j))
    );
    return this;
  }

  [Symbol.iterator]() {
    let currentRow = 0;
    let currentCol = 0;
    const data = this.data;

    return {
      next() {
        if (currentRow < data.length) {
          if (currentCol < data[currentRow].length) {
            return { value: data[currentRow][currentCol++], done: false };
          }
          currentCol = 0;
          currentRow++;
          return this.next();
        }
        return { done: true };
      },
    };
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const matrixA = new Matrix(2, 3).map(() => Math.floor(Math.random() * 10));
const matrixB = new Matrix(3, 2).map(() => Math.floor(Math.random() * 10));

print('Matrix A:\n' + matrixA.toString());
print('Matrix B:\n' + matrixB.toString());

try {
  const matrixC = Matrix.multiply(matrixA, matrixB);
  print('Matrix C (A * B):\n' + matrixC.toString());
} catch (error) {
  console.error(error.message);
}

 
print('Iterating through matrix A:');
for (let value of matrixA) {
  print(value);
}
