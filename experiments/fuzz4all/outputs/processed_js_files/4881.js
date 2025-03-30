class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromDimensions(rows, cols, filler = () => 0) {
    return new Matrix(
      Array.from({ length: rows }, () => Array.from({ length: cols }, filler))
    );
  }

  static transpose(matrix) {
    return new Matrix(matrix.data[0].map((_, colIndex) => matrix.data.map(row => row[colIndex])));
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }
  
  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

 
const identityMatrix = Matrix.fromDimensions(3, 3, (row, col) => (row === col ? 1 : 0));
print('Identity Matrix:');
print(identityMatrix.toString());

 
const transposedMatrix = Matrix.transpose(identityMatrix);
print('\nTransposed Matrix:');
print(transposedMatrix.toString());

 
print('\nElements in the Matrix:');
print([...identityMatrix]);
