class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr.map(row => [...row]));
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.data.length) {
          if (col < this.data[row].length) {
            return { value: this.data[row][col++], done: false };
          } else {
            col = 0;
            row++;
            return this.next();
          }
        }
        return { done: true };
      }
    };
  }

  *transpose() {
    const [rowCount, colCount] = [this.data.length, this.data[0].length];
    for (let col = 0; col < colCount; col++) {
      yield this.data.map(row => row[col]);
    }
  }

  async mapAsync(callback) {
    const result = this.data.map(row => row.map(() => null));
    const promises = [];
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        promises.push(async () => {
          result[i][j] = await callback(this.data[i][j], i, j);
        });
      }
    }
    await Promise.all(promises.map(fn => fn()));
    return Matrix.fromArray(result);
  }
}

const matrix = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]);

(async () => {
  print("Original Matrix:");
  print(matrix.data);
  
  print("Transposed:");
  print([...matrix.transpose()]);
  
  print("Mapped Matrix (async * 2):");
  const mappedMatrix = await matrix.mapAsync(async (value) => {
     
    return new Promise(resolve => setTimeout(() => resolve(value * 2), 100));
  });
  print(mappedMatrix.data);
})();
