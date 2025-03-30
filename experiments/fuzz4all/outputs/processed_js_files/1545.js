class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        m.map((_, i) => arr[i]);
        return m;
    }

    static subtract(a, b) {
        let result = new Matrix(a.rows, a.cols);
        result.map((_, i, j) => a.data[i][j] - b.data[i][j]);
        return result;
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(other) {
        if (other instanceof Matrix) {
            if (this.cols !== other.rows) {
                console.error("Columns of A must match rows of B");
                return undefined;
            }
            let result = new Matrix(this.rows, other.cols);
            result.map((_, i, j) => {
                let sum = 0;
                for (let k = 0; k < this.cols; k++) {
                    sum += this.data[i][k] * other.data[k][j];
                }
                return sum;
            });
            return result;
        } else {
            return this.map(val => val * other);
        }
    }

    applyActivation(fn) {
        return this.map(fn);
    }

    toArray() {
        let arr = [];
        this.map((val) => arr.push(val));
        return arr;
    }

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);
        result.map((_, i, j) => matrix.data[j][i]);
        return result;
    }
}

class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this.outputNodes = outputNodes;

        this.weights_ih = new Matrix(this.hiddenNodes, this.inputNodes).map(() => Math.random() * 2 - 1);
        this.weights_ho = new Matrix(this.outputNodes, this.hiddenNodes).map(() => Math.random() * 2 - 1);
        this.bias_h = new Matrix(this.hiddenNodes, 1).map(() => Math.random() *