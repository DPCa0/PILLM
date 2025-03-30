class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromSize(rows, cols, fill = 0) {
        return new Matrix(Array.from({ length: rows }, () => Array(cols).fill(fill)));
    }

    map(callback) {
        return new Matrix(this.data.map((row, i) => row.map((val, j) => callback(val, i, j))));
    }

    add(matrix) {
        if (this.data.length !== matrix.data.length || this.data[0].length !== matrix.data[0].length) {
            throw new Error('Matrices are not the same size.');
        }
        return this.map((val, i, j) => val + matrix.data[i][j]);
    }

    toString() {
        return this.data.map(row => row.join(', ')).join('\n');
    }
}

const compose = (...functions) => args => functions.reduceRight((arg, fn) => fn(arg), args);

const scale = factor => matrix => matrix.map(val => val * factor);

const identity = Matrix.fromSize(3, 3, 1);
const increment = new Matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);

const transform = compose(
    scale(2),
    matrix => matrix.add(identity),
);

const result = transform(increment);
print(result.toString());
