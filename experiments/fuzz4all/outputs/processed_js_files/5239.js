class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(array2D) {
    return new Matrix(array2D.map(row => [...row]));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  multiply(matrixB) {
    const matrixA = this.data;
    const [aRows, aCols] = [matrixA.length, matrixA[0].length];
    const [bRows, bCols] = [matrixB.data.length, matrixB.data[0].length];
    if (aCols !== bRows) throw new Error("Incompatible matrix sizes for multiplication");
    
    return new Matrix(
      Array.from({ length: aRows }, (_, i) => 
        Array.from({ length: bCols }, (_, j) => 
          Array.from({ length: aCols }, (_, k) => matrixA[i][k] * matrixB.data[k][j])
            .reduce((sum, val) => sum + val, 0)
        )
      )
    );
  }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async function main() {
  const matrixA = Matrix.from([[1, 2], [3, 4]]);
  const matrixB = Matrix.from([[5, 6], [7, 8]]);
  
  print('Matrix A: ', matrixA);
  print('Matrix B: ', matrixB);

  print("Performing Matrix Multiplication...");
  
  await sleep(2000);  

  const resultMatrix = matrixA.multiply(matrixB);
  
  print('Resultant Matrix: ', resultMatrix);
})();
