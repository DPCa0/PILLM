class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
  }

  [Symbol.iterator]() {
    let rowIndex = 0;
    let colIndex = 0;
    const data = this.data;
    return {
      next() {
        if (rowIndex < data.length && colIndex < data[rowIndex].length) {
          const value = data[rowIndex][colIndex];
          colIndex++;
          if (colIndex >= data[rowIndex].length) {
            colIndex = 0;
            rowIndex++;
          }
          return { value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }

  static transpose(matrix) {
    const transposed = new Matrix(matrix.data[0].length, matrix.data.length);
    for (let i = 0; i < matrix.data.length; i++) {
      for (let j = 0; j < matrix.data[i].length; j++) {
        transposed.data[j][i] = matrix.data[i][j];
      }
    }
    return transposed;
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

const originalMatrix = new Matrix(3, 3, (Math.random() * 10) | 0);
print('Original Matrix:');
print(originalMatrix.toString());

const transposedMatrix = Matrix.transpose(originalMatrix);
print('\nTransposed Matrix:');
print(transposedMatrix.toString());

print('\nIterating Over Transposed Matrix:');
for (let value of transposedMatrix) {
  print(value);
}
