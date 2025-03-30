class Matrix {
  constructor(data) {
    this.data = data;
  }

  static identity(size) {
    return new Matrix(Array.from({ length: size }, (_, i) => 
      Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))));
  }

  static multiply(a, b) {
    return new Matrix(a.data.map((row, i) =>
      b.data[0].map((_, j) =>
        row.reduce((sum, _, n) => sum + a.data[i][n] * b.data[n][j], 0))));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function animateIdentityMultiplication(size, times, delayTime) {
  let matrix = Matrix.identity(size);
  const randomMatrix = new Matrix(Array.from({ length: size }, () => 
    Array.from({ length: size }, () => Math.floor(Math.random() * 10))));
  
  print('Initial Matrix:\n' + randomMatrix.toString());
  
  for (let i = 0; i < times; i++) {
    matrix = Matrix.multiply(matrix, randomMatrix);
    console.clear();
    print(`Multiplication #${i + 1}:\n` + matrix.toString());
    await delay(delayTime);
  }
}

animateIdentityMultiplication(3, 5, 1000);
