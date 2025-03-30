class Matrix {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (const row of this.data) {
      yield* row;
    }
  }

  static async fromFetch(url) {
    const response = await fetch(url);
    const data = await response.json();
    return new Matrix(data);
  }

  map(fn) {
    return new Matrix(this.data.map(row => row.map(fn)));
  }

  reduce(fn, initial) {
    return this.data.reduce((acc, row) => row.reduce(fn, acc), initial);
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

(async () => {
  const url = 'https://api.example.com/matrix';
  const matrix = await Matrix.fromFetch(url);
  print('Original Matrix:');
  print(matrix.toString());

  const squaredMatrix = matrix.map(x => x ** 2);
  print('Squared Matrix:');
  print(squaredMatrix.toString());

  const sum = matrix.reduce((acc, x) => acc + x, 0);
  print(`Sum of elements: ${sum}`);
})();
