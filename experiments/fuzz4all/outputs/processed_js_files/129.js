class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
    }

    static fromArray(arr) {
        const mat = new Matrix(arr.length, arr[0].length);
        mat.map((_, i, j) => arr[i][j]);
        return mat;
    }

    map(callback) {
        this.data = this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
        return this;
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) throw new Error('Incompatible matrix sizes');
        return new Matrix(this.data.length, other.data[0].length).map((_, i, j) =>
            this.data[i].reduce((sum, elem, k) => sum + elem * other.data[k][j], 0)
        );
    }

    static random(rows, cols, min = 0, max = 1) {
        return new Matrix(rows, cols).map(() => Math.random() * (max - min) + min);
    }

    log() {
        console.table(this.data);
    }
}

const matrix1 = Matrix.random(3, 2, 0, 10);
const matrix2 = Matrix.random(2, 3, 0, 10);

const result = matrix1.multiply(matrix2);

print("Matrix 1:");
matrix1.log();

print("Matrix 2:");
matrix2.log();

print("Result of multiplication:");
result.log();
