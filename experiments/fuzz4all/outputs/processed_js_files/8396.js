class Matrix {
  constructor(data) {
    this.data = data;
  }

  static identity(size) {
    return new Matrix(
      Array.from({ length: size }, (_, i) =>
        Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
      )
    );
  }

  [Symbol.iterator]() {
    let row = 0;
    let col = 0;
    const { data } = this;

    return {
      next: () => {
        if (row >= data.length) return { done: true };
        const value = data[row][col];
        if (col < data[row].length - 1) {
          col++;
        } else {
          col = 0;
          row++;
        }
        return { value, done: false };
      },
    };
  }

  multiply(other) {
    const result = this.data.map((row) =>
      other.data[0].map((_, j) =>
        row.reduce((sum, elm, i) => sum + elm * other.data[i][j], 0)
      )
    );
    return new Matrix(result);
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

async function fetchRandomMatrix(size) {
  const response = await fetch(`https: 
  if (!response.ok) throw new Error('Failed to fetch matrix');
  const data = await response.json();
  return new Matrix(data);
}

(async () => {
  try {
    const identity = Matrix.identity(3);
    print('Identity Matrix:');
    print(identity.toString());

    const randomMatrix = await fetchRandomMatrix(3);
    print('\nRandom Matrix:');
    print(randomMatrix.toString());

    const product = identity.multiply(randomMatrix);
    print('\nProduct of Identity and Random Matrix:');
    print(product.toString());
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
