class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromString(str) {
    return new Matrix(
      str.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number))
    );
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      for (let val of row) {
        yield val;
      }
    }
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }

  map(fn) {
    return new Matrix(this.data.map(row => row.map(fn)));
  }

  transpose() {
    return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  const text = await response.text();
  return text;
}

(async () => {
  const url = 'https://example.com/matrix.txt';
  try {
    const data = await fetchData(url);
    const matrix = Matrix.fromString(data);
    print('Original Matrix:');
    print(matrix.toString());

    const transposed = matrix.transpose();
    print('\nTransposed Matrix:');
    print(transposed.toString());

    print('\nDoubled Values:');
    print(matrix.map(val => val * 2).toString());

    print('\nIterating through values:');
    for (let value of matrix) {
      print(value);
    }
  } catch (error) {
    console.error('Error fetching matrix:', error);
  }
})();
