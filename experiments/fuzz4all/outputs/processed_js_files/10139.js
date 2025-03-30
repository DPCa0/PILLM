class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => fill)
    );
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrices');
    const result = new Matrix(a.data.length, b.data[0].length);
    return result.map((_, i, j) => a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0));
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

async function fetchRandomMatrix(rows, cols) {
  const response = await fetch(`https: 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "generateIntegers",
      params: { apiKey: "YOUR_API_KEY", n: rows * cols, min: 0, max: 9, replacement: true },
      id: 42
    })
  });

  const data = await response.json();
  const numbers = data.result.random.data;
  return new Matrix(rows, cols).map((_, i, j) => numbers[i * cols + j]);
}

(async () => {
  const [matrixA, matrixB] = await Promise.all([fetchRandomMatrix(3, 2), fetchRandomMatrix(2, 3)]);
  print('Matrix A:\n', matrixA.toString());
  print('Matrix B:\n', matrixB.toString());
  const product = Matrix.multiply(matrixA, matrixB);
  print('Product A * B:\n', product.toString());
})();
