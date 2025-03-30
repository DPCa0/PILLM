class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(arr) {
        let matrix = new Matrix(arr.length, 1);
        arr.forEach((val, idx) => matrix.data[idx][0] = val);
        return matrix;
    }

    toArray() {
        return this.data.flat();
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            throw new Error('Columns of A must match rows of B');
        }
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

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                result.data[j][i] = matrix.data[i][j];
            }
        }
        return result;
    }

    map(callback) {
        return this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    }

    static map(matrix, callback) {
        let result = new Matrix(matrix.rows, matrix.cols);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                let val = matrix.data[i][j];
                result.data[i][j] = callback(val, i, j);
            }
        }
        return result;
    }
}

const sigmoid = x => 1 / (1 + Math.exp(-x));
const sigmoidDerivative = y => y * (1 - y);

class NeuralNetwork {
    constructor(inputNodes, hiddenNodes, outputNodes) {
        this.inputNodes = inputNodes;
        this.hiddenNodes = hiddenNodes;
        this