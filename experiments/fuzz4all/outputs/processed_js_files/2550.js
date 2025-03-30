class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(dimensions, initializer = () => Math.random()) {
    return new Matrix(
      Array.from({ length: dimensions[0] }, () =>
        Array.from({ length: dimensions[1] }, initializer)
      )
    );
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    const data = this.data;
    return {
      next() {
        if (row < data.length && col < data[row].length) {
          const value = data[row][col++];
          if (col === data[row].length) {
            col = 0;
            row++;
          }
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }
}

const identity = (size) => {
  return Matrix.from([size, size], (val, i, j) => (i === j ? 1 : 0));
};

const logTranspose = (matrix) => {
  const transposed = matrix.map((_, i, j) => matrix.data[j][i]);
  print(transposed.toString());
};

const matrix = Matrix.from([3, 3], (val, i, j) => i * 3 + j + 1);
print('Original Matrix:');
print(matrix.toString());

print('\nTransposed Matrix:');
logTranspose(matrix);

print('\nIdentity Matrix:');
print(identity(3).toString());

print('\nIterating over Matrix:');
for (const val of matrix) {
  print(val);
}
