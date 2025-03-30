class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error("Columns of A must match rows of B");
    }
    const result = new Matrix(a.data.length, b.data[0].length);
    for (let i = 0; i < result.data.length; i++) {
      for (let j = 0; j < result.data[0].length; j++) {
        result.data[i][j] = a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0);
      }
    }
    return result;
  }
}

const asyncProcess = async (matrix) => {
   
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      const processedMatrix = new Matrix(matrix.data.length, matrix.data[0].length);
      for (let i = 0; i < matrix.data.length; i++) {
        for (let j = 0; j < matrix.data[i].length; j++) {
          processedMatrix.data[i][j] = matrix.data[i][j] * 2;
        }
      }
      resolve(processedMatrix);
    }, 1000);
  });

  return result;
};

const main = async () => {
  const a = new Matrix(2, 3, 1);
  const b = new Matrix(3, 2, 2);

  try {
    const multipliedMatrix = Matrix.multiply(a, b);
    print("Multiplied Matrix:");
    console.table(multipliedMatrix.data);

    const processedMatrix = await asyncProcess(multipliedMatrix);
    print("Processed Matrix:");
    console.table(processedMatrix.data);
  } catch (error) {
    console.error(error);
  }
};

main();
