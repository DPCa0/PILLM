class Matrix {
    #data;
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.#data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static fromArray(array) {
        const m = new Matrix(array.length, 1);
        m.map((_, i) => array[i]);
        return m;
    }

    toArray() {
        let arr = [];
        this.map(value => arr.push(value));
        return arr;
    }

    static map(A, func) {
        let result = new Matrix(A.rows, A.cols);
        for (let i = 0; i < A.rows; i++) {
            for (let j = 0; j < A.cols; j++) {
                result.#data[i][j] = func(A.#data[i][j], i, j);
            }
        }
        return result;
    }

    map(func) {
        this.#data = this.#data.map((row, i) => row.map((val, j) => func(val, i, j)));
        return this;
    }

    static multiply(A, B) {
        if (A.cols !== B.rows) throw new Error("Columns of A must match rows of B.");
        let result = new Matrix(A.rows, B.cols);
        return Matrix.map(result, (_, i, j) => {
            let sum = 0;
            for (let k = 0; k < A.cols; k++) {
                sum += A.#data[i][k] * B.#data[k][j];
            }
            return sum;
        });
    }

    add(matrix) {
        this.#data = this.#data.map((row, i) => row.map((val, j) => val + matrix.#data[i][j]));
        return this;
    }

    randomize() {
        return this.map(() => Math.random() * 2 - 1);
    }
}

class NeuralNetwork {
    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes).randomize();
        this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes).randomize();

        this.bias_h = new Matrix(this.hidden_nodes, 1).randomize();
        this.bias_o