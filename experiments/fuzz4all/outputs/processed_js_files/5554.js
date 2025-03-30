class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
    }

    static identity(size) {
        return new Matrix(size, size, 0).map((_, i, j) => (i === j ? 1 : 0));
    }

    map(fn) {
        return new Matrix(this.data.length, this.data[0].length).apply((value, i, j) => fn(this.data[i][j], i, j));
    }

    apply(fn) {
        this.data.forEach((row, i) => row.forEach((_, j) => this.data[i][j] = fn(this.data[i][j], i, j)));
        return this;
    }

    multiply(matrixB) {
        const matrixA = this;
        if (matrixA.data[0].length !== matrixB.data.length) throw new Error('Incompatible matrices');

        return new Matrix(matrixA.data.length, matrixB.data[0].length).map((_, i, j) => 
            matrixA.data[i].reduce((sum, element, k) => sum + element * matrixB.data[k][j], 0)
        );
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

(async () => {
    try {
        const [rowsA, colsA, rowsB, colsB] = [3, 2, 2, 3];
        if (colsA !== rowsB) throw new Error('Incompatible dimensions for multiplication');

        const matrixA = new Matrix(rowsA, colsA).apply(() => Math.floor(Math.random() * 10));
        const matrixB = new Matrix(rowsB, colsB).apply(() => Math.floor(Math.random() * 10));

        print('Matrix A:\n', matrixA.toString());
        print('Matrix B:\n', matrixB.toString());

        const resultMatrix = matrixA.multiply(matrixB);
        print('Result of A x B:\n', resultMatrix.toString());
    } catch (error) {
        console.error('An error occurred:', error.message);
    }
})();
