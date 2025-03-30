class Matrix {
  constructor(rows, cols, fillValue = 0) {
    this.rows = rows;
    this.cols = cols;
    this.data = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
  }

  static multiply(a, b) {
    if (a.cols !== b.rows) throw new Error('Columns of A must match rows of B');
    let result = new Matrix(a.rows, b.cols);
    for (let i = 0; i < result.rows; i++) {
      for (let j = 0; j < result.cols; j++) {
        let sum = 0;
        for (let k = 0; k < a.cols; k++) {
          sum += a.data[i][k] * b.data[k][j];
        }
        result.data[i][j] = sum;
      }
    }
    return result;
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  static fromArray(arr) {
    return new Matrix(arr.length, 1).map((_, i) => arr[i]);
  }

  toArray() {
    return this.data.reduce((acc, row) => [...acc, ...row], []);
  }
}

const neuralNetwork = {
  input_nodes: 3,
  hidden_nodes: 3,
  output_nodes: 2,

  weights_ih: new Matrix(3, 3),
  weights_ho: new Matrix(2, 3),
  bias_h: new Matrix(3, 1),
  bias_o: new Matrix(2, 1),

  randomize() {
    this.weights_ih.map(() => Math.random() * 2 - 1);
    this.weights_ho.map(() => Math.random() * 2 - 1);
    this.bias_h.map(() => Math.random() * 2 - 1);
    this.bias_o.map(() => Math.random() * 2 - 1);
  },

  feedforward(inputArray) {
    let inputs = Matrix.fromArray(inputArray);
    let hidden = Matrix.multiply(this.weights_ih, inputs);
    hidden.map((val, i, j) => val + this.bias_h.data[i][j]);
    hidden.map(sigmoid);

    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.map((val