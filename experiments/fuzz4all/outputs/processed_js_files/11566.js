class Matrix {
  constructor(data) {
    this.data = data;
  }
  
  static identity(size) {
    return new Matrix(Array.from({ length: size }, (_, i) => 
      Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    ));
  }

  multiply(matrix) {
    const result = this.data.map((row, i) =>
      matrix.data[0].map((_, j) =>
        row.reduce((sum, val, k) => sum + val * matrix.data[k][j], 0)
      )
    );
    return new Matrix(result);
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  const m1 = new Matrix([[1, 2], [3, 4]]);
  const m2 = Matrix.identity(2);
  
  print('Matrix 1:\n' + m1);
  print('Identity Matrix:\n' + m2);
  
  await delay(1000);
  
  const result = m1.multiply(m2);
  print('Resulting Matrix:\n' + result);
})();
