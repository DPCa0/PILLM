class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(size, fillFn = () => 0) {
    return new Matrix(Array.from({ length: size }, (_, i) => 
      Array.from({ length: size }, (_, j) => fillFn(i, j))
    ));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
  }

  reduce(fn, initial) {
    return this.data.flat().reduce(fn, initial);
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }

  [Symbol.iterator]() {
    let index = 0;
    const elements = this.data.flat();
    return {
      next: () => ({
        value: elements[index],
        done: index++ >= elements.length
      })
    };
  }

  static multiply(A, B) {
    const size = A.data.length;
    const result = Matrix.from(size, () => 0);

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        for (let k = 0; k < size; k++) {
          result.data[i][j] += A.data[i][k] * B.data[k][j];
        }
      }
    }

    return result;
  }
}

const size = 3;
const A = Matrix.from(size, (i, j) => i + j);
const B = Matrix.from(size, (i, j) => i * j);

print('Matrix A:');
print(A.toString());

print('Matrix B:');
print(B.toString());

const C = Matrix.multiply(A, B);

print('Matrix C (A * B):');
print(C.toString());

print('Flattened elements of C:');
for (const val of C) {
  print(val);
}

const sumOfElements = C.reduce((sum, val) => sum + val, 0);
print('Sum of all elements in C:', sumOfElements);
