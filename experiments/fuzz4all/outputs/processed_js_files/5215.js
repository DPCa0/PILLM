class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(nestedArray) {
    return new Matrix(nestedArray);
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  transpose() {
    return new Matrix(this.data[0].map((_, colIndex) => this.data.map(row => row[colIndex])));
  }

  print() {
    print(this.data.map(row => row.join('\t')).join('\n'));
  }
}

 
const originalMatrix = Matrix.from([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

const transposedMatrix = originalMatrix.transpose();
transposedMatrix.print();

const scaledMatrix = originalMatrix.map(val => val * 2);
scaledMatrix.print();

const flattened = [...originalMatrix];
print(flattened);
