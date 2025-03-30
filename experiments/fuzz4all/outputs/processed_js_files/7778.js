class Matrix {
  #data;
  
  constructor(rows, cols, fill = 0) {
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }
  
  static fromArray(array) {
    const matrix = new Matrix(array.length, array[0].length);
    matrix.#data = array;
    return matrix;
  }

  *[Symbol.iterator]() {
    for (let row of this.#data) {
      yield row;
    }
  }
  
  map(callback) {
    return Matrix.fromArray(this.#data.map((row, i) => row.map((val, j) => callback(val, i, j))));
  }

  toString() {
    return this.#data.map(row => row.join('\t')).join('\n');
  }
  
  static multiply(A, B) {
    if (A.#data[0].length !== B.#data.length) {
      throw new Error("Matrices dimensions do not match for multiplication");
    }
    return new Matrix(A.#data.length, B.#data[0].length).map((_, i, j) =>
      A.#data[i].reduce((sum, el, k) => sum + el * B.#data[k][j], 0)
    );
  }
}

 
const A = Matrix.fromArray([
  [1, 2, 3],
  [4, 5, 6]
]);

const B = Matrix.fromArray([
  [7, 8],
  [9, 10],
  [11, 12]
]);

const C = Matrix.multiply(A, B);
print(C.toString());
