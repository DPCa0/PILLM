class Matrix {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (let row of this.data) {
      for (let item of row) {
        yield item;
      }
    }
  }

  static async fromAsync(source) {
    const data = [];
    for await (let row of source) {
      data.push(row);
    }
    return new Matrix(data);
  }

  map(transform) {
    return new Proxy(this, {
      get: (target, property) => {
        if (property in target) {
          return target[property];
        }
        const index = parseInt(property, 10);
        if (!isNaN(index)) {
          return target.data[index].map(transform);
        }
      }
    });
  }

  reduce(reducer, initialValue) {
    return this.data.reduce((acc, row) => row.reduce(reducer, acc), initialValue);
  }
}

(async () => {
  const asyncSource = (async function* () {
    yield [1, 2, 3];
    yield [4, 5, 6];
    yield [7, 8, 9];
  })();

  const matrix = await Matrix.fromAsync(asyncSource);

  print([...matrix]);  

  const squaredMatrix = matrix.map(x => x ** 2);
  print(squaredMatrix[0]);  

  const sum = matrix.reduce((acc, val) => acc + val, 0);
  print(sum);  
})();
