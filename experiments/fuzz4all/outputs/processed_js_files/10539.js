class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
    }

    static fromArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.map((_, i, j) => arr[i][j]);
        return matrix;
    }

    static random(rows, cols, min = 0, max = 1) {
        const matrix = new Matrix(rows, cols);
        matrix.map(() => Math.random() * (max - min) + min);
        return matrix;
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error('Columns of A must match rows of B.');
        }
        const result = new Matrix(a.data.length, b.data[0].length);
        result.map((_, i, j) => a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0));
        return result;
    }

    print() {
        console.table(this.data);
    }
}

 
const matrixA = Matrix.random(3, 2, -10, 10);
const matrixB = Matrix.random(2, 3, -10, 10);
const result = Matrix.multiply(matrixA, matrixB);

print('Matrix A:');
matrixA.print();

print('Matrix B:');
matrixB.print();

print('Result of A * B:');
result.print();
