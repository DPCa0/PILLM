class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    const size = Math.sqrt(arr.length);
    if (size % 1 !== 0) throw new Error("Array length must be a perfect square.");
    let matrix = [];
    for (let i = 0; i < size; i++) {
      matrix.push(arr.slice(i * size, i * size + size));
    }
    return new Matrix(matrix);
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      for (let value of row) {
        yield value;
      }
    }
  }

  map(callback) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => callback(value, i, j))));
  }

  async reduceAsync(callback, initialValue) {
    let result = initialValue;
    for (let value of this) {
      result = await callback(result, value);
    }
    return result;
  }
}

 
(async () => {
  const matrix = Matrix.fromArray([1, 2, 3, 4]);
  const squaredMatrix = matrix.map(v => v * v);
  print([...squaredMatrix]);  

  const sum = await squaredMatrix.reduceAsync(async (acc, value) => acc + value, 0);
  print(sum);  
})();
