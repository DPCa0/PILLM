class Matrix {
  constructor(data) {
    this.data = data;
  }
  
  static fromArray(array) {
    return new Matrix(array.map(row => [...row]));
  }

  static identity(size) {
    return new Matrix([...Array(size)].map((_, i) =>
      [...Array(size)].map((_, j) => (i === j ? 1 : 0))
    ));
  }

  add(matrix) {
    this._validateSize(matrix);
    return new Matrix(this.data.map((row, i) => 
      row.map((val, j) => val + matrix.data[i][j])
    ));
  }
  
  multiply(matrix) {
    this._validateMultiplication(matrix);
    const result = this.data.map((row, i) => 
      [...Array(matrix.data[0].length)].map((_, j) =>
        row.reduce((sum, val, k) => sum + val * matrix.data[k][j], 0)
      )
    );
    return new Matrix(result);
  }

  _validateSize(matrix) {
    if (this.data.length !== matrix.data.length ||
        this.data[0].length !== matrix.data[0].length) {
      throw new Error('Matrices must be of the same size');
    }
  }
  
  _validateMultiplication(matrix) {
    if (this.data[0].length !== matrix.data.length) {
      throw new Error('Incompatible matrix sizes for multiplication');
    }
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

 
(async () => {
  try {
    const a = Matrix.fromArray([[1, 2], [3, 4]]);
    const b = Matrix.identity(2);

    const added = a.add(b);
    const multiplied = a.multiply(b);

    print('Matrix A:');
    print(a.toString());
    print('\nMatrix B (Identity):');
    print(b.toString());
    print('\nA + B:');
    print(added.toString());
    print('\nA * B:');
    print(multiplied.toString());
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
