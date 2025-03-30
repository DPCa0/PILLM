class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(size, fill = 0) {
    return new Matrix(Array.from({ length: size }, () => Array(size).fill(fill)));
  }

  static identity(size) {
    const matrix = Matrix.from(size);
    return matrix.map((_, i, j) => (i === j ? 1 : 0));
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  multiply(other) {
    const result = Matrix.from(this.data.length);
    return result.map((_, i, j) =>
      this.data[i].reduce((sum, elem, k) => sum + elem * other.data[k][j], 0)
    );
  }

  log() {
    print(this.data.map(row => row.join('\t')).join('\n'));
  }
}

const randomMatrix = Matrix.from(3).map(() => Math.floor(Math.random() * 10));
const identityMatrix = Matrix.identity(3);
const product = randomMatrix.multiply(identityMatrix);

print("Random Matrix:");
randomMatrix.log();
print("\nIdentity Matrix:");
identityMatrix.log();
print("\nProduct of Random Matrix and Identity Matrix:");
product.log();
