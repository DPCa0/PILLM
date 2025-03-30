class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static identity(size) {
    return new Matrix(size, size, 0).map((_, i, j) => (i === j ? 1 : 0));
  }

  map(callback) {
    this.data = this.data.map((row, i) =>
      row.map((value, j) => callback(value, i, j))
    );
    return this;
  }

  multiply(other) {
    if (other instanceof Matrix) {
      if (this.cols !== other.rows) {
        throw new Error('Columns of A must match rows of B.');
      }
      let result = new Matrix(this.rows, other.cols);
      return result.map((_, i, j) =>
        this.data[i].reduce((sum, elem, k) => sum + elem * other.data[k][j], 0)
      );
    } else {
      return this.map((value) => value * other);
    }
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

class SpecialMatrix extends Matrix {
  constructor(rows, cols, fill = 0) {
    super(rows, cols, fill);
    this.timestamp = Date.now();
  }

  static fromArray(arr) {
    let matrix = new SpecialMatrix(arr.length, arr[0].length);
    matrix.data = arr;
    return matrix;
  }

  log() {
    print(`Matrix created at: ${new Date(this.timestamp).toISOString()}`);
    print(this.toString());
  }
}

async function asyncProcess(matrix, factor) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(matrix.multiply(factor));
    }, 1000);
  });
}

 
(async () => {
  let matrixA = SpecialMatrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);
  
  matrixA.log();
  
  let identity = Matrix.identity(3);
  print('\nIdentity Matrix:');
  print(identity.toString());
  
  let result = await asyncProcess(matrixA, 2);
  console.log('\nAfter Async Multiplication