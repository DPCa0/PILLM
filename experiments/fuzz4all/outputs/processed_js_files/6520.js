class Matrix {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      for (let value of row) {
        yield value;
      }
    }
  }

  static async fromURL(url) {
    const response = await fetch(url);
    const data = await response.json();
    return new Matrix(data);
  }

  toString() {
    return this.data.map(row => row.join(', ')).join('\n');
  }

  async process(callback) {
    for await (let value of this) {
      callback(value);
    }
  }
}

(async () => {
  const matrixData = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const matrix = new Matrix(matrixData);
  print('Matrix:');
  print(matrix.toString());

  print('Processed values:');
  await matrix.process(value => print(value * 2));

   
   
   
   
})();
