class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => defaultValue)
        );
    }

    static fromArray(arr) {
        return new Matrix(arr.length, arr[0].length).map((_, i, j) => arr[i][j]);
    }

    map(fn) {
        this.data = this.data.map((row, i) =>
            row.map((value, j) => fn(value, i, j))
        );
        return this;
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error("Incompatible matrices");
        let result = new Matrix(a.data.length, b.data[0].length);
        return result.map((_, i, j) =>
            a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
        );
    }

    [Symbol.iterator]() {
        let currentRow = 0;
        let currentCol = 0;
        let { data } = this;

        return {
            next() {
                if (currentRow >= data.length) return { done: true };
                const value = data[currentRow][currentCol];
                currentCol = (currentCol + 1) % data[0].length;
                if (currentCol === 0) currentRow++;
                return { value, done: false };
            }
        };
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

 
const matrixA = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
]);

const matrixB = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12]
]);

try {
    const product = Matrix.multiply(matrixA, matrixB);
    print(product.toString());
} catch (e) {
    console.error(e.message);
}

 
for (const value of matrixA) {
    print(value);
}
