class Matrix {
  constructor(data) {
    this.data = data;
  }
  
  static from(size, fn) {
    return new Matrix(
      Array.from({ length: size }, (_, i) => 
        Array.from({ length: size }, (_, j) => fn(i, j))
      )
    );
  }
  
  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }
  
  map(fn) {
    return new Matrix(
      this.data.map((row, i) => 
        row.map((value, j) => fn(value, i, j))
      )
    );
  }
}

const size = 3;
const identityMatrix = Matrix.from(size, (i, j) => (i === j ? 1 : 0));
const incrementedMatrix = identityMatrix.map(x => x + 1);

print('Identity Matrix:');
identityMatrix.data.forEach(row => print(row));

print('\nIncremented Matrix:');
incrementedMatrix.data.forEach(row => print(row));

print('\nFlattened Iteration over Incremented Matrix:');
for (let value of incrementedMatrix) {
  print(value);
}
