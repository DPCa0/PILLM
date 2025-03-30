class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(arr) {
        return new Matrix(arr.length, arr[0].length).map((_, i, j) => arr[i][j]);
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(b) {
        if (b instanceof Matrix) {
            if (this.data[0].length !== b.data.length) {
                throw new Error('Columns of A must match rows of B');
            }
            return new Matrix(this.data.length, b.data[0].length)
                .map((_, i, j) => 
                    this.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
                );
        } else {
            return this.map(val => val * b);
        }
    }

    static identity(size) {
        return new Matrix(size, size)
            .map((_, i, j) => (i === j ? 1 : 0));
    }

    static multiply(...matrices) {
        return matrices.reduce((acc, mtx) => acc.multiply(mtx));
    }
}

const A = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]);

const B = Matrix.fromArray([
    [9, 8, 7],
    [6, 5, 4],
    [3, 2, 1]
]);

const C = new Matrix(3, 1, 2);

const result = Matrix.multiply(A, B, C);
print(result.data);
