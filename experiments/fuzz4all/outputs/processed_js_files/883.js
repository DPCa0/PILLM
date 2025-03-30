class Matrix {
  constructor(data) {
    this.data = data;
  }

  static from(dimensions, fill = 0) {
    const createArray = (dims) => {
      if (dims.length === 0) return fill;
      const [size, ...rest] = dims;
      return Array.from({ length: size }, () => createArray(rest));
    };
    return new Matrix(createArray(dimensions));
  }

  map(func) {
    const mapArray = (arr, indices = []) => {
      return arr.map((val, idx) => Array.isArray(val) 
        ? mapArray(val, [...indices, idx])
        : func(val, [...indices, idx])
      );
    };
    return new Matrix(mapArray(this.data));
  }

  toString() {
    return JSON.stringify(this.data);
  }

  *[Symbol.iterator]() {
    const flat = (arr) => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val) : val), []);
    yield* flat(this.data);
  }
}

 
const matrix = Matrix.from([3, 3], 1);
const transformed = matrix.map((val, [x, y]) => val + x + y);

print('Transformed Matrix:', transformed.toString());

for (const value of transformed) {
  print('Iterating:', value);
}
