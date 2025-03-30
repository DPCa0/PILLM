class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => defaultValue)
        );
    }

    static fromArray(array) {
        const rows = array.length;
        const cols = array[0].length;
        const mat = new Matrix(rows, cols);
        mat.data = array;
        return mat;
    }

    map(fn) {
        return Matrix.fromArray(this.data.map((row, i) =>
            row.map((val, j) => fn(val, i, j))
        ));
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error('Columns of A must match rows of B.');
        }
        let result = new Matrix(a.data.length, b.data[0].length);
        result.data = result.data.map((row, i) =>
            row.map((_, j) =>
                a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
            )
        );
        return result;
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

 
const A = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
]);

const B = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12]
]);

const C = Matrix.multiply(A, B);
print(C.toString());
