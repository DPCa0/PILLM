class Matrix {
  constructor(rows, cols, defaultValue = 0) {
    this.data = Array.from({ length: rows }, () => 
      Array.from({ length: cols }, () => defaultValue)
    );
  }

  static fromArray(arr) {
    const rows = arr.length;
    const cols = arr[0].length;
    const matrix = new Matrix(rows, cols);
    matrix.data = arr;
    return matrix;
  }

  map(fn) {
    return new Matrix(
      this.data.length,
      this.data[0].length,
      0
    ).apply((_, i, j) => fn(this.data[i][j], i, j));
  }

  apply(fn) {
    for (let i = 0; i < this.data.length; i++) {
      for (let j = 0; j < this.data[i].length; j++) {
        this.data[i][j] = fn(this.data[i][j], i, j);
      }
    }
    return this;
  }

  [Symbol.iterator]() {
    let rowIndex = 0, colIndex = 0;
    const data = this.data;
    return {
      next() {
        if (rowIndex < data.length) {
          const value = data[rowIndex][colIndex++];
          if (colIndex === data[rowIndex].length) {
            colIndex = 0;
            rowIndex++;
          }
          return { value, done: false };
        }
        return { done: true };
      }
    };
  }

  toString() {
    return this.data.map(row => row.join(', ')).join('\n');
  }
}

async function fetchMatrixData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json();
}

(async function main() {
  const url = 'https://api.example.com/matrix';
  try {
    const matrixData = await fetchMatrixData(url);
    const matrix = Matrix.fromArray(matrixData);
    
    const processedMatrix = matrix.map((val, i, j) => val * (i + j));
    for (let value of processedMatrix) {
      print(value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
