class Matrix {
  constructor(data) {
    this.data = data;
  }

  static identity(size) {
    return new Matrix(Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    ));
  }

  map(fn) {
    return new Matrix(this.data.map((row, i) => row.map((value, j) => fn(value, i, j))));
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) throw new Error("Incompatible matrices");
    const result = this.data.map(row =>
      matrix.transpose().data.map(col =>
        row.reduce((sum, value, i) => sum + value * col[i], 0)
      )
    );
    return new Matrix(result);
  }

  transpose() {
    return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
  }

  toString() {
    return this.data.map(row => row.join('\t')).join('\n');
  }
}

const deepFreeze = (obj) => {
  Object.getOwnPropertyNames(obj).forEach(name => {
    let prop = obj[name];
    if (typeof prop === 'object' && prop !== null) deepFreeze(prop);
  });
  return Object.freeze(obj);
};

const identity = Matrix.identity(3);
const transformation = new Matrix([
  [2, 0, 0],
  [0, 2, 0],
  [0, 0, 1]
]);

const result = identity.multiply(transformation);

const frozenResult = deepFreeze(result);
print(frozenResult.toString());

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

const proxiedMatrix = new Proxy(new Matrix([[1, 2], [3, 4]]), handler);

print(proxiedMatrix.toString());
