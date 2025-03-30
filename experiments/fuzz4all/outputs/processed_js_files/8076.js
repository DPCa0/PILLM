class Matrix {
  #matrix;
  
  constructor(rows, cols, fillValue = 0) {
    this.#matrix = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
  }

  static fromArray(arr) {
    const matrix = new Matrix(arr.length, arr[0].length);
    matrix.#matrix = arr.map(row => [...row]);
    return matrix;
  }

  map(callback) {
    this.#matrix = this.#matrix.map((row, rowIndex) => 
      row.map((val, colIndex) => callback(val, rowIndex, colIndex))
    );
    return this;
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.#matrix.length && col < this.#matrix[row].length) {
          const value = this.#matrix[row][col];
          col++;
          if (col >= this.#matrix[row].length) {
            row++;
            col = 0;
          }
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }

  toString() {
    return this.#matrix.map(row => row.join(' ')).join('\n');
  }
}

 
(async () => {
  const mat = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);

  print("Original Matrix:");
  print(mat.toString());

  const delayedMultiply = async (x) => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x * 2;
  };
  
  mat.map(async (value) => await delayedMultiply(value));

  print("\nModified Matrix:");
  print(mat.toString());

  print("\nIterating over matrix:");
  for (const value of mat) {
    print(value);
  }
})();
