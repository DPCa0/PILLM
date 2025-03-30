class Matrix {
    constructor(rows, cols, fillValue = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
    }

    static from(array) {
        let m = new Matrix(array.length, array[0].length);
        m.data = array;
        return m;
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let value of row) {
                yield value;
            }
        }
    }

    map(fn) {
        return Matrix.from(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrices');
        return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
            a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
        );
    }
}

const a = new Matrix(2, 3, 1);
const b = new Matrix(3, 2, 2);

const result = Matrix.multiply(a, b);

print([...result]);
