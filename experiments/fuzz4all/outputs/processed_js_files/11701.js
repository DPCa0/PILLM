class Matrix {
  constructor(data) {
    this.data = data;
  }

  static create(rows, cols, callback) {
    return new Matrix(
      Array.from({ length: rows }, (_, i) =>
        Array.from({ length: cols }, (_, j) => callback(i, j))
      )
    );
  }

  multiply(matrix) {
    const result = Matrix.create(
      this.data.length,
      matrix.data[0].length,
      () => 0
    );

    this.data.forEach((row, i) => {
      row.forEach((_, j) => {
        matrix.data[0].forEach((_, k) => {
          result.data[i][k] += this.data[i][j] * matrix.data[j][k];
        });
      });
    });

    return result;
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

 
const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      const [i, j] = prop.split(',').map(Number);
      return target.data[i][j];
    }
  },
  set(target, prop, value) {
    const [i, j] = prop.split(',').map(Number);
    target.data[i][j] = value;
    return true;
  }
};

 
const identity = Matrix.create(3, 3, (i, j) => (i === j ? 1 : 0));

 
const matrixB = Matrix.create(3, 3, (i, j) => i * 3 + j + 1);

 
const proxyIdentity = new Proxy(identity, handler);
const proxyMatrixB = new Proxy(matrixB, handler);

 
const resultMatrix = proxyIdentity.multiply(proxyMatrixB);

print('Identity Matrix:\n', identity.toString());
print('Matrix B:\n', matrixB.toString());
print('Resultant Matrix:\n', resultMatrix.toString());

 
print('Access element [1,1] through proxy:', proxyMatrixB['1,1']);
proxyMatrixB['1,1'] = 10;
console.log('Modified Matrix B:\n',