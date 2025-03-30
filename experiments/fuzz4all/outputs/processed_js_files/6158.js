class Matrix {
  constructor(data) {
    this.data = data;
  }

  static identity(size) {
    return new Matrix([...Array(size)].map((_, i) => 
      [...Array(size)].map((_, j) => i === j ? 1 : 0)));
  }

  multiply(matrix) {
    if (this.data[0].length !== matrix.data.length) 
      throw new Error('Incompatible matrices');
      
    return new Matrix(this.data.map((row, i) => 
      matrix.data[0].map((_, j) => 
        row.reduce((sum, _, n) => sum + this.data[i][n] * matrix.data[n][j], 0)
      )
    ));
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

 
const handler = {
  get: function(target, prop) {
    if (prop === 'multiply') {
      return function(...args) {
        print('Multiplying matrices:');
        print(target.toString());
        print(args[0].toString());
        return target.multiply(...args);
      };
    }
    return target[prop];
  }
};

const matrixA = new Matrix([[1, 2, 3], [4, 5, 6]]);
const matrixB = new Matrix([[7, 8], [9, 10], [11, 12]]);
const proxyA = new Proxy(matrixA, handler);

const result = proxyA.multiply(matrixB);

const observable = new Observable();
observable.subscribe(data => print('Resultant matrix:\n' + data.toString()));
observable.notify(result);
