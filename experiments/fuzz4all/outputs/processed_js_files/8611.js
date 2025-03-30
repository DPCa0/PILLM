class Matrix {
  constructor(data) {
    this.data = data;
  }

   
  get dimensions() {
    return { rows: this.data.length, cols: this.data[0].length };
  }

   
  static async fromArray(array) {
    return new Promise((resolve, reject) => {
      try {
        resolve(new Matrix(array));
      } catch (e) {
        reject(e);
      }
    });
  }

   
  *transpose() {
    for (let i = 0; i < this.data[0].length; i++) {
      let row = [];
      for (let j = 0; j < this.data.length; j++) {
        row.push(this.data[j][i]);
      }
      yield row;
    }
  }

   
  static createProxy(matrix) {
    return new Proxy(matrix, {
      get(target, property) {
        print(`Accessing property: ${property}`);
        return target[property];
      }
    });
  }
}

(async () => {
  const matrixData = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const matrix = await Matrix.fromArray(matrixData);
  const proxiedMatrix = Matrix.createProxy(matrix);

  print(`Dimensions: ${proxiedMatrix.dimensions.rows}x${proxiedMatrix.dimensions.cols}`);

  for (let row of proxiedMatrix.transpose()) {
    print(`Transposed row: ${row.join(', ')}`);
  }
})();
