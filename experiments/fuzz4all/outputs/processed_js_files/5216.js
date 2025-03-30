class Matrix {
    constructor(rows, cols) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static fromArray(arr) {
        let matrix = new Matrix(arr.length, arr[0].length);
        matrix.data = arr;
        return matrix;
    }

    static add(m1, m2) {
        return m1.map((row, i) =>
            row.map((val, j) => val + m2[i][j])
        );
    }

    map(fn) {
        return this.data.map((row, i) =>
            row.map((val, j) => fn(val, i, j))
        );
    }

    multiply(matrixOrScalar) {
        if (matrixOrScalar instanceof Matrix) {
            if (this.data[0].length !== matrixOrScalar.data.length) {
                throw new Error("Columns of A must match rows of B.");
            }
            return this.map((_, i, j) =>
                this.data[i].reduce((sum, elm, k) =>
                    sum + elm * matrixOrScalar.data[k][j], 0)
            );
        } else {
            return this.map(val => val * matrixOrScalar);
        }
    }

    toString() {
        return this.data.map(row => row.join(', ')).join('\n');
    }
}

class Neuron {
    constructor(inputs) {
        this.weights = Array.from({ length: inputs }, () => Math.random() * 2 - 1);
        this.bias = Math.random() * 2 - 1;
    }

    feedforward(inputs) {
        const total = inputs.reduce((sum, input, i) =>
            sum + input * this.weights[i], this.bias);
        return Neuron.sigmoid(total);
    }

    static sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

(async () => {
    const matrix1 = Matrix.fromArray([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
    const matrix2 = Matrix.fromArray([[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    const resultMatrix =