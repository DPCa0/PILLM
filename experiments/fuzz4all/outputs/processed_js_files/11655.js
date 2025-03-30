class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }
  
  static identity(size) {
    let matrix = new Matrix(size, size);
    for (let i = 0; i < size; i++) {
      matrix.data[i][i] = 1;
    }
    return matrix;
  }

  [Symbol.iterator]() {
    let row = 0, col = 0;
    return {
      next: () => {
        if (row < this.data.length) {
          let value = this.data[row][col++];
          if (col >= this.data[row].length) {
            row++;
            col = 0;
          }
          return { value, done: false };
        } else {
          return { done: true };
        }
      }
    };
  }

  map(func) {
    return this.data.map((row, i) => row.map((val, j) => func(val, i, j)));
  }

  static fromArray(arr) {
    let matrix = new Matrix(arr.length, arr[0].length);
    matrix.data = arr;
    return matrix;
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

 
const identityMatrix = Matrix.identity(3);
print('Identity Matrix:');
print(identityMatrix.toString());

const randomMatrix = new Matrix(3, 3, () => Math.floor(Math.random() * 10));
print('\nRandom Matrix:');
print(randomMatrix.toString());

print('\nIterating through Identity Matrix:');
for (let value of identityMatrix) {
  print(value);
}

const doubledMatrix = Matrix.fromArray(randomMatrix.map(val => val * 2));
print('\nDoubled Matrix:');
print(doubledMatrix.toString());
