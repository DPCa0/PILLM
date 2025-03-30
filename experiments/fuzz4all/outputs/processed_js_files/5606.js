class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    const size = Math.sqrt(arr.length);
    if (!Number.isInteger(size)) throw new Error("Array length must be a perfect square");
    const matrix = [];
    for (let i = 0; i < size; i++) {
      matrix.push(arr.slice(i * size, (i + 1) * size));
    }
    return new Matrix(matrix);
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    return {
      next: () => {
        if (row >= this.data.length) return { done: true };
        const value = this.data[row][col];
        col++;
        if (col >= this.data[row].length) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }

  async multiplyAsync(otherMatrix) {
    if (this.data[0].length !== otherMatrix.data.length) 
      throw new Error("Incompatible matrices for multiplication");

    const result = this.data.map(row => 
      otherMatrix.data[0].map((_, colIndex) => 
        row.reduce((sum, item, rowIndex) => sum + item * otherMatrix.data[rowIndex][colIndex], 0)
      )
    );

    return new Promise(resolve => setTimeout(() => resolve(new Matrix(result)), 1000));
  }
}

(async () => {
  const matrixA = Matrix.fromArray([1, 2, 3, 4]);
  const matrixB = Matrix.fromArray([5, 6, 7, 8]);

  for (const value of matrixA) {
    print(`MatrixA value: ${value}`);
  }

  try {
    const resultMatrix = await matrixA.multiplyAsync(matrixB);
    print("Multiplication Result:");
    resultMatrix.data.forEach(row => print(row));
  } catch (error) {
    console.error(error.message);
  }
})();
