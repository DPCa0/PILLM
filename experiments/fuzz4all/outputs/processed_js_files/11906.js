class Matrix {
  constructor(data) {
    this.data = data;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Columns of A must match rows of B');
    }
    return new Matrix(
      a.data.map((row, i) =>
        b.data[0].map((_, j) =>
          row.reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
        )
      )
    );
  }

  [Symbol.iterator]() {
    return this.data.values();
  }

  toString() {
    return this.data.map(row => row.join(', ')).join('\n');
  }
}

const a = new Matrix([
  [1, 2, 3],
  [4, 5, 6],
]);

const b = new Matrix([
  [7, 8],
  [9, 10],
  [11, 12],
]);

try {
  const c = Matrix.multiply(a, b);
  print(`Matrix C:\n${c.toString()}`);
} catch (error) {
  console.error(error.message);
}

(async () => {
  function asyncFunction() {
    return new Promise(resolve => setTimeout(() => resolve('Resolved!'), 1000));
  }

  const promiseResult = await asyncFunction();
  print(`Async Result: ${promiseResult}`);
})();

const proxyHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      return `Property ${prop.toString()} does not exist`;
    }
  },
};

const proxyObject = new Proxy({ existingProp: 42 }, proxyHandler);
print(proxyObject.existingProp);  
print(proxyObject.nonExistentProp);  
