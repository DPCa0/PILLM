class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(array) {
    return new Matrix(array);
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    return {
      next: () => {
        if (row < this.data.length && col < this.data[row].length) {
          const value = this.data[row][col++];
          if (col === this.data[row].length) {
            row++;
            col = 0;
          }
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  *transpose() {
    for (let col = 0; col < this.data[0].length; col++) {
      yield this.data.map(row => row[col]);
    }
  }
}

const multiply = (a, b) => {
  const result = Array.from({ length: a.length }, () => Array(b[0].length).fill(0));
  return result.map((row, i) =>
    row.map((_, j) =>
      a[i].reduce((sum, elm, k) => sum + elm * b[k][j], 0)
    )
  );
};

const matA = Matrix.from([
  [1, 2, 3],
  [4, 5, 6]
]);

const matB = Matrix.from([
  [7, 8],
  [9, 10],
  [11, 12]
]);

print("Matrix A:");
for (const value of matA) {
  process.stdout.write(value + " ");
}
print("\n\nMatrix B:");
for (const value of matB) {
  process.stdout.write(value + " ");
}
print("\n\nMatrix A * B:");
const result = multiply(matA.data, matB.data);
result.forEach(row => print(row));

print("\nTranspose of Matrix A:");
for (const row of matA.transpose()) {
  print(row);
}
