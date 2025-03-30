class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(size, fn) {
    return new Matrix(
      Array.from({ length: size }, (_, i) => 
        Array.from({ length: size }, (_, j) => fn(i, j))
      )
    );
  }

  map(fn) {
    return new Matrix(
      this.data.map((row, i) => row.map((value, j) => fn(value, i, j)))
    );
  }

  forEach(fn) {
    this.data.forEach((row, i) => row.forEach((value, j) => fn(value, i, j)));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }

  static identity(size) {
    return Matrix.from(size, (i, j) => (i === j ? 1 : 0));
  }
}

 
const identityMatrix = Matrix.identity(5);

 
const transformedMatrix = identityMatrix.map((value, i, j) => value + i + j);

 
transformedMatrix.forEach((value, i, j) => {
  if (value !== 0) {
    print(`Non-zero value: ${value} at position [${i}, ${j}]`);
  }
});

print("Transformed Matrix:");
print(transformedMatrix.toString());
