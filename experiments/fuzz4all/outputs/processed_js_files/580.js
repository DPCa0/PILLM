class Matrix {
  #data;

  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    const matrix = new Matrix(arr.length, arr[0].length);
    matrix.#data = arr;
    return matrix;
  }

  map(callback) {
    this.#data = this.#data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return this;
  }

  toString() {
    return this.#data.map(row => row.join('\t')).join('\n');
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row >= this.rows) return { done: true };
        const value = this.#data[row][col];
        col++;
        if (col >= this.cols) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }
}

const main = async () => {
  const mat1 = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
  ]);

  const doubled = mat1.map(x => x * 2);
  print(doubled.toString());

  const sum = [...doubled].reduce((acc, val) => acc + val, 0);
  print(`Sum: ${sum}`);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  await delay(1000);
  print('Completed after 1 second');
};

main();
