class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.map((_, i, j) => arr[i][j]);
        return matrix;
    }

    toArray() {
        return this.data;
    }

    map(callback) {
        this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
        return this;
    }

    static map(matrix, callback) {
        const result = new Matrix(matrix.rows, matrix.cols);
        result.map((_, i, j) => callback(matrix.data[i][j], i, j));
        return result;
    }

    multiply(other) {
        if (other instanceof Matrix) {
             
            if (this.cols !== other.rows) throw new Error('Columns of A must match rows of B.');
            const result = new Matrix(this.rows, other.cols);
            result.map((_, i, j) => 
                this.data[i].reduce((sum, val, k) => sum + val * other.data[k][j], 0)
            );
            return result;
        } else {
             
            this.map(val => val * other);
            return this;
        }
    }

    static transpose(matrix) {
        const result = new Matrix(matrix.cols, matrix.rows);
        result.map((_, i, j) => matrix.data[j][i]);
        return result;
    }

    static random(rows, cols, min = 0, max = 1) {
        const result = new Matrix(rows, cols);
        result.map(() => Math.random() * (max - min) + min);
        return result;
    }
}

 
const A = Matrix.random(3, 3);
const B = Matrix.random(3, 2);
const C = A.multiply(B);
print('Matrix A:', A.toArray());
print('Matrix B:', B.toArray());
print('Matrix C (A * B):', C.toArray());

const AT = Matrix.transpose(A);
print('Transpose of A:', AT.toArray());
