 
class Matrix {
  #data;

  constructor(rows, cols, fill = 0) {
    this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static #validateDimensions(matrixA, matrixB) {
    return (
      matrixA.#data.length === matrixB.#data.length &&
      matrixA.#data[0].length === matrixB.#data[0].length
    );
  }

  get dimensions() {
    return [this.#data.length, this.#data[0].length];
  }

  set value({ row, col, value }) {
    if (
      row >= 0 &&
      row < this.#data.length &&
      col >= 0 &&
      col < this.#data[0].length
    ) {
      this.#data[row][col] = value;
    } else {
      throw new Error("Index out of bounds");
    }
  }

  static add(matrixA, matrixB) {
    if (!Matrix.#validateDimensions(matrixA, matrixB))
      throw new Error("Matrices must have the same dimensions");

    let result = new Matrix(matrixA.#data.length, matrixA.#data[0].length);
    for (let i = 0; i < matrixA.#data.length; i++) {
      for (let j = 0; j < matrixA.#data[0].length; j++) {
        result.#data[i][j] =
          matrixA.#data[i][j] + matrixB.#data[i][j];
      }
    }
    return result;
  }

   
  *[Symbol.iterator]() {
    for (let row of this.#data) {
      for (let value of row) {
        yield value;
      }
    }
  }
}

 
const handler = {
  set(target, prop, value) {
    if (prop === 'value' && (!value || typeof value !== 'object')) {
      throw new Error("Invalid value format");
    }
    return Reflect.set(target, prop, value);
  }
};

let matrix1 = new Proxy(new Matrix(2, 2), handler);
let matrix2 = new Proxy(new Matrix(2, 2, 1), handler);

matrix1.value = { row: 0, col: 0