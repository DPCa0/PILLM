class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(size, fill) {
    return new Matrix(Array.from({ length: size }, () => Array(size).fill(fill)));
  }

  [Symbol.iterator]() {
    let row = 0, col = 0, self = this;
    return {
      next() {
        if (row >= self.data.length) return { done: true };
        let value = self.data[row][col];
        col++;
        if (col >= self.data[row].length) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }

  async *asyncIterator() {
    for (let row of this.data) {
      for (let cell of row) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield cell;
      }
    }
  }

  transpose() {
    return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
  }

  multiply(other) {
    if (this.data[0].length !== other.data.length) throw new Error("Incompatible matrices");
    return new Matrix(this.data.map(row => 
      other.data[0].map((_, i) => 
        row.reduce((sum, el, j) => sum + el * other.data[j][i], 0)
      )
    ));
  }
}

(async () => {
  const matrix1 = Matrix.from(3, 1);
  const matrix2 = Matrix.from(3, 2).transpose();

  const product = matrix1.multiply(matrix2);

  print("Matrix Product:");
  for (let row of product.data) {
    print(row);
  }

  print("Iterating using for...of:");
  for (let value of product) {
    print(value);
  }

  print("Iterating using async iterator:");
  for await (let value of product.asyncIterator()) {
    print(value);
  }
})();
