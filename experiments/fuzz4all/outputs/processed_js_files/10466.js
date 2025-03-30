class AsyncMatrixMultiplier {
  constructor(matrixA, matrixB) {
    this.matrixA = matrixA;
    this.matrixB = matrixB;
    this.result = [];
  }

  async multiplyMatrices() {
    if (!this._canMultiply()) {
      throw new Error("Matrices cannot be multiplied due to dimension mismatch.");
    }
    const promises = this.matrixA.map((row, i) =>
      Promise.all(
        this.matrixB[0].map((_, j) => this._dotProduct(row, this._getColumn(j), i, j))
      )
    );
    this.result = await Promise.all(promises);
    return this.result;
  }

  _dotProduct(row, col, i, j) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = row.reduce((sum, elem, index) => sum + elem * col[index], 0);
        resolve(product);
      }, 100);
    });
  }

  _getColumn(j) {
    return this.matrixB.map(row => row[j]);
  }

  _canMultiply() {
    return this.matrixA[0].length === this.matrixB.length;
  }
}

const matrixA = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const matrixB = [
  [9, 8, 7],
  [6, 5, 4],
  [3, 2, 1]
];

(async () => {
  try {
    const multiplier = new AsyncMatrixMultiplier(matrixA, matrixB);
    const result = await multiplier.multiplyMatrices();
    print('Resultant Matrix:', result);
  } catch (error) {
    console.error(error.message);
  }
})();
