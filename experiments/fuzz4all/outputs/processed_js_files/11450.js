class Matrix {
  constructor(data) {
    this.data = data;
  }

  static identity(size) {
    return new Matrix([...Array(size)].map((_, i) =>
      [...Array(size)].map((_, j) => (i === j ? 1 : 0))
    ));
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      yield* row;
    }
  }

  transpose() {
    return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) {
      throw new Error("Incompatible matrix sizes for multiplication");
    }
    return new Matrix(this.data.map(row =>
      matrix.transpose().data.map(col =>
        row.reduce((acc, val, idx) => acc + val * col[idx], 0)
      )
    ));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

 
const A = new Matrix([[1, 2], [3, 4]]);
const B = Matrix.identity(2);

print('Matrix A:');
print(A.toString());

print('\nIdentity Matrix B:');
print(B.toString());

const C = A.multiply(B);
print('\nA * B:');
print(C.toString());

print('\nTransposed A:');
print(A.transpose().toString());

print('\nIterating through A:');
for (let val of A) {
  print(val);
}
