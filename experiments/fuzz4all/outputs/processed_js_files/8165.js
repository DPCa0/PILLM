class Matrix {
  constructor(data) {
    this.data = data;
  }

  static fromArray(arr) {
    return new Matrix(arr.map(row => [...row]));
  }

  toString() {
    return this.data.map(row => row.join(', ')).join('\n');
  }

  *[Symbol.iterator]() {
    for (let row of this.data) yield row;
  }

  map(fn) {
    return Matrix.fromArray(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  static async identity(size) {
    return new Promise((resolve) => {
      const data = Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => (i === j ? 1 : 0)));
      setTimeout(() => resolve(new Matrix(data)), 1000);
    });
  }
}

 
(async () => {
  const identityMatrix = await Matrix.identity(3);
  print("Identity Matrix:\n" + identityMatrix.toString());

  const randomMatrix = new Matrix([[1, 2], [3, 4]]);
  print("\nOriginal Matrix:\n" + randomMatrix.toString());

  const squaredMatrix = randomMatrix.map((value) => value ** 2);
  print("\nSquared Matrix:\n" + squaredMatrix.toString());

  print("\nIterating over matrix rows:");
  for (let row of randomMatrix) {
    print(row);
  }
})();
