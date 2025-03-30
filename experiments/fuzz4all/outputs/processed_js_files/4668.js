class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => defaultValue));
    }

    static from(array) {
        const rows = array.length;
        const cols = array[0].length;
        const matrix = new Matrix(rows, cols);
        matrix.data = array;
        return matrix;
    }

    map(callback) {
        return Matrix.from(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
    }

    static multiply(A, B) {
        if (A.data[0].length !== B.data.length) throw new Error('Matrix dimensions do not match for multiplication');
        const result = new Matrix(A.data.length, B.data[0].length);
        return result.map((_, i, j) => {
            return A.data[i].reduce((sum, el, k) => sum + el * B.data[k][j], 0);
        });
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

const A = Matrix.from([
    [1, 2, 3],
    [4, 5, 6]
]);

const B = Matrix.from([
    [7, 8],
    [9, 10],
    [11, 12]
]);

const C = Matrix.multiply(A, B);

print('Matrix A:');
print(A.toString());
print('\nMatrix B:');
print(B.toString());
print('\nMatrix C (A * B):');
print(C.toString());
