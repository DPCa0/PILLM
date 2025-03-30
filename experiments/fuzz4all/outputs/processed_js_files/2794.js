class Matrix {
  constructor(rows, cols, fill = 0) {
    this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
  }

  static multiply(A, B) {
    if (A.data[0].length !== B.data.length) throw new Error('Columns of A must match rows of B.');
    return new Matrix(A.data.length, B.data[0].length).map((_, i, j) =>
      A.data[i].reduce((sum, val, k) => sum + val * B.data[k][j], 0)
    );
  }

  map(fn) {
    this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    return this;
  }

  toString() {
    return this.data.map(row => row.join(' ')).join('\n');
  }
}

class NeuralNetwork {
  constructor(input_nodes, hidden_nodes, output_nodes) {
    this.input_nodes = input_nodes;
    this.hidden_nodes = hidden_nodes;
    this.output_nodes = output_nodes;

    this.weights_ih = new Matrix(hidden_nodes, input_nodes).map(() => Math.random() * 2 - 1);
    this.weights_ho = new Matrix(output_nodes, hidden_nodes).map(() => Math.random() * 2 - 1);
    this.bias_h = new Matrix(hidden_nodes, 1).map(() => Math.random() * 2 - 1);
    this.bias_o = new Matrix(output_nodes, 1).map(() => Math.random() * 2 - 1);
  }

  feedforward(input_array) {
    let inputs = new Matrix(input_array.length, 1).map((_, i) => input_array[i]);

    let hidden = Matrix.multiply(this.weights_ih, inputs).map((val, i) => val + this.bias_h.data[i][0]);
    hidden = hidden.map(sigmoid);

    let output = Matrix.multiply(this.weights_ho, hidden).map((val, i) => val + this.bias_o.data[i][0]);
    output = output.map(sigmoid);

    return output.data.flat();
  }
}

const sigmoid = x => 1 / (1 + Math.exp(-x));

 
const nn = new NeuralNetwork(2, 2, 1);
print(nn.feedforward([1, 0]));
