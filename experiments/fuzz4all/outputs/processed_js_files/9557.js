class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static fromArray(array) {
    let matrix = new Matrix(array.length, array[0].length);
    matrix.map((_, i, j) => array[i][j]);
    return matrix;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Columns of A must match rows of B.');
    }
    return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
      a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
    );
  }

  static randomize(rows, cols, min = 0, max = 1) {
    return new Matrix(rows, cols).map(
      () => Math.random() * (max - min) + min
    );
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
}

 
(async function() {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    print('Fetched data:', data.slice(0, 3));  

    let a = Matrix.randomize(3, 2);
    let b = Matrix.randomize(2, 3);
    let result = Matrix.multiply(a, b);
    print('Matrix A:\n', a.toString());
    print('Matrix B:\n', b.toString());
    print('Result of A * B:\n', result.toString());

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
