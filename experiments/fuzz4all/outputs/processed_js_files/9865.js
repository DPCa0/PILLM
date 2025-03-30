class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static from(array) {
    const matrix = new Matrix(array.length, array[0].length);
    matrix.data = array.map(row => [...row]);
    return matrix;
  }

  map(callback) {
    this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    return this;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error('Columns of A must match rows of B');
    return new Matrix(a.rows, b.cols).map((_, i, j) => 
      a.data[i].reduce((sum, val, index) => sum + val * b.data[index][j], 0)
    );
  }
}

const asyncFetchJson = async (url) => {
  try {
    const response = await fetch(url);
    return response.ok ? response.json() : Promise.reject('Failed to load');
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

(async () => {
  const matrixA = Matrix.from([[1, 2, 3], [4, 5, 6]]);
  const matrixB = Matrix.from([[7, 8], [9, 10], [11, 12]]);
  const resultMatrix = Matrix.multiply(matrixA, matrixB);
  print('Matrix A multiplied by Matrix B:', resultMatrix.data);

  const url = 'https://api.github.com/';
  const apiData = await asyncFetchJson(url);
  print('GitHub API data:', apiData);
})();
