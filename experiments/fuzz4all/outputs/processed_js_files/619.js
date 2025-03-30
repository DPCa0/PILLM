class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => defaultValue)
        );
    }

    static fromArray(arr) {
        const mat = new Matrix(arr.length, arr[0].length);
        mat.map((_, i, j) => arr[i][j]);
        return mat;
    }

    toArray() {
        return this.data.map(row => [...row]);
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B.");
        return new Matrix(a.rows, b.cols).map((_, i, j) =>
            Array.from({ length: a.cols }, (_, k) => a.data[i][k] * b.data[k][j]).reduce((acc, val) => acc + val, 0)
        );
    }

    static identity(size) {
        return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
    }

    log() {
        console.table(this.data);
        return this;
    }
}

 
const handler = {
    set(target, prop, value) {
        if (prop === 'data' && Array.isArray(value)) {
            print(`Matrix data updated with new values.`);
        }
        target[prop] = value;
        return true;
    }
};

const matrixA = new Proxy(new Matrix(3, 3), handler);
matrixA.map((_, i, j) => i + j + 1).log();

const matrixB = new Proxy(Matrix.identity(3), handler);
matrixB.log();

const product = new Proxy(Matrix.multiply(matrixA, matrixB), handler);
product.log();
