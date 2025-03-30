class Matrix {
  constructor(rows, cols, fill = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static fromArray(arr) {
    let m = new Matrix(arr.length, arr[0].length);
    m.map((_, i, j) => arr[i][j]);
    return m;
  }

  toArray() {
    return this.data;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B.");
    return new Matrix(a.rows, b.cols).map((_, i, j) => {
      return a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0);
    });
  }

  log() {
    console.table(this.data);
    return this;
  }
}

async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

const transpose = (matrix) => {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
};

(async function main() {
  try {
    let rawData = await fetchData('https://api.sampleapis.com/futurama/characters');
    let sampleData = rawData.slice(0, 2).map(char => [char.id, char.species.length]);
    
    const matA = Matrix.fromArray(sampleData);
    const matB = Matrix.fromArray(transpose(sampleData));
    
    print("Matrix A:");
    matA.log();

    print("Matrix B:");
    matB.log();

    print("Product of A and B:");
    Matrix.multiply(matA, matB).log();
  } catch (err) {
    console.error("Error in computation:", err);
  }
})();
