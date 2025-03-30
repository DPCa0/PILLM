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

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.rows) {
          let value = { value: this.data[row][col], done: false };
          col++;
          if (col === this.cols) {
            col = 0;
            row++;
          }
          return value;
        }
        return { done: true };
      }
    };
  }

  *transpose() {
    for (let col = 0; col < this.cols; col++) {
      let newRow = [];
      for (let row = 0; row < this.rows; row++) {
        newRow.push(this.data[row][col]);
      }
      yield newRow;
    }
  }

  map(callback) {
    return Matrix.fromArray(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

 
const originalMatrix = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

print('Original Matrix:');
print(originalMatrix.toString());

const transposedMatrix = [...originalMatrix.transpose()];
print('\nTransposed Matrix:');
print(transposedMatrix.map(row => row.join('\t')).join('\n'));

const mappedMatrix = originalMatrix.map((value, i, j) => value * (i + 1));
print('\nMapped Matrix (value * row_index):');
print(mappedMatrix.toString());

print('\nIterating over Original Matrix:');
for (let value of originalMatrix) {
  print(value);
}
