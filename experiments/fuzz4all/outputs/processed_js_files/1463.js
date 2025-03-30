class Matrix {
  constructor(data) {
    this.data = data;
  }

  static multiply(a, b) {
    if (a.data[0].length !== b.data.length) {
      throw new Error('Incompatible matrix dimensions');
    }
    let result = Array.from({ length: a.data.length }, () =>
      Array(b.data[0].length).fill(0)
    );
    return new Matrix(
      result.map((row, i) =>
        row.map((_, j) =>
          a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
        )
      )
    );
  }
}

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const complexOperation = memoize((a, b, x) => {
  const m1 = new Matrix(a);
  const m2 = new Matrix(b);
  const multiplied = Matrix.multiply(m1, m2).data;

  return multiplied.map(row => row.map(val => Math.pow(val, x)));
});

 
const a = [
  [1, 2],
  [3, 4]
];
const b = [
  [5, 6],
  [7, 8]
];

const processMatrices = async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const data = complexOperation(a, b, 2);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
    print('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

processMatrices();
