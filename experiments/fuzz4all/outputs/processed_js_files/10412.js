 

class Matrix {
  #matrix;
  
  constructor(rows, cols, filler = 0) {
    this.#matrix = Array.from({ length: rows }, () => Array(cols).fill(filler));
  }

  static fromArray(arr) {
    const matrix = new Matrix(arr.length, arr[0].length);
    matrix.#matrix = arr;
    return matrix;
  }

  get(rows, cols) {
    return this.#matrix[rows][cols];
  }

  set(rows, cols, value) {
    this.#matrix[rows][cols] = value;
  }

  *[Symbol.iterator]() {
    for (const row of this.#matrix) {
      yield row;
    }
  }

  map(callback) {
    const newMatrix = this.#matrix.map((row, i) => row.map((value, j) => callback(value, i, j)));
    return Matrix.fromArray(newMatrix);
  }

  static multiply(a, b) {
    if (a.#matrix[0].length !== b.#matrix.length) throw new Error('Matrices dimensions do not match for multiplication');
    
    const result = new Matrix(a.#matrix.length, b.#matrix[0].length);

    for (let i = 0; i < a.#matrix.length; i++) {
      for (let j = 0; j < b.#matrix[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.#matrix.length; k++) {
          sum += a.get(i, k) * b.get(k, j);
        }
        result.set(i, j, sum);
      }
    }

    return result;
  }
}

 
const matrixA = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);

const matrixB = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const resultMatrix = Matrix.multiply(matrixA, matrixB);
print([...resultMatrix].map(row => row.join(' ')).join('\n'));

 
const transformedMatrix = resultMatrix.map(value => value ** 2);
print([...transformedMatrix].map(row => row.join(' ')).join('\n'));
