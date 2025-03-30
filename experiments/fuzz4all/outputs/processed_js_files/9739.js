class Matrix {
  constructor(data) {
    this.data = data;
  }

  static multiply(A, B) {
    if (A[0].length !== B.length) throw new Error('Incompatible matrices');
    return new Matrix(
      A.map(row => 
        B[0].map((_, i) => 
          row.reduce((sum, el, j) => sum + el * B[j][i], 0)
        )
      )
    );
  }

  [Symbol.iterator]() {
    let data = this.data.flat(), index = 0;
    return {
      next: () => ({
        value: data[index],
        done: index++ >= data.length
      })
    };
  }
}

 
const handler = {
  get(target, prop, receiver) {
    if (typeof target[prop] === 'function') {
      return function(...args) {
        print(`Calling ${prop} with arguments:`, args);
        return Reflect.apply(target[prop], target, args);
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

const matA = new Matrix([[1, 2], [3, 4]]);
const matB = new Matrix([[5, 6], [7, 8]]);
const proxyA = new Proxy(matA, handler);

try {
  const result = Matrix.multiply(proxyA.data, matB.data);
  for (let value of result) {
    print(value);
  }
} catch (error) {
  console.error(error);
}
