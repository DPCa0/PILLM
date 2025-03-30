class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArrays(arrays) {
    return new Matrix(arrays.map(row => [...row]));
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row >= this.data.length) return { done: true };
        let value = { row, col, value: this.data[row][col] };
        col++;
        if (col >= this.data[row].length) {
          col = 0;
          row++;
        }
        return { value, done: false };
      }
    };
  }

  static async loadRemoteMatrix(url) {
    let response = await fetch(url);
    let jsonData = await response.json();
    return new Matrix(jsonData);
  }

  *[Symbol.asyncIterator]() {
    for (let row = 0; row < this.data.length; row++) {
      yield this.data[row];
    }
  }

  transpose() {
    return new Matrix(this.data[0].map((_, colIndex) => this.data.map(row => row[colIndex])));
  }
}

async function processMatrix(url) {
  let matrix = await Matrix.loadRemoteMatrix(url);

  for (let { row, col, value } of matrix) {
    print(`Value at [${row}, ${col}]: ${value}`);
  }

  let transposedMatrix = matrix.transpose();

  print('Transposed Matrix:');
  for await (let row of transposedMatrix) {
    print(row.join(' '));
  }
}

let matrixUrl = 'https://api.example.com/matrix';   
processMatrix(matrixUrl).catch(console.error);
