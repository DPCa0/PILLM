class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(size, fn) {
        return new Matrix(Array.from({ length: size }, (_, i) =>
            Array.from({ length: size }, (_, j) => fn(i, j))
        ));
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) =>
            row.map((value, j) => fn(value, i, j))
        ));
    }

    static identity(size) {
        return Matrix.from(size, (i, j) => (i === j ? 1 : 0));
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) {
            throw new Error('Incompatible matrices');
        }
        return Matrix.from(this.data.length, (i, j) =>
            this.data[i].reduce((sum, _, n) => sum + this.data[i][n] * other.data[n][j], 0)
        );
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

 
async function* transformAsyncMatrix(matrix, delay) {
    for (let [i, row] of matrix.data.entries()) {
        await new Promise(resolve => setTimeout(resolve, delay));
        yield matrix.map((value, x, y) => (x === i ? value * 2 : value));
    }
}

(async () => {
    const size = 3;
    const matrix = Matrix.from(size, (i, j) => i + j + 1);
    const identity = Matrix.identity(size);
    print("Original Matrix:\n", matrix.toString(), "\n");

    const multipliedMatrix = matrix.multiply(identity);
    print("Multiplied with Identity Matrix:\n", multipliedMatrix.toString(), "\n");

    print("Transforming Matrix Asynchronously:");
    for await (const transformedMatrix of transformAsyncMatrix(matrix, 1000)) {
        print(transformedMatrix.toString(), "\n");
    }
})();
