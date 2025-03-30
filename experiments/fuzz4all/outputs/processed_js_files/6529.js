class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => fill)
        );
    }

    static identity(size) {
        return new Matrix(size, size).map((_, i, j) => (i === j ? 1 : 0));
    }

    map(fn) {
        return this.data.map((row, i) =>
            row.map((val, j) => fn(val, i, j))
        );
    }

    multiply(matrix) {
        if (this.data[0].length !== matrix.data.length) {
            throw new Error('Incompatible matrix sizes for multiplication');
        }
        const result = new Matrix(this.data.length, matrix.data[0].length);
        return result.map((_, i, j) =>
            this.data[i].reduce((sum, element, index) =>
                sum + element * matrix.data[index][j], 0)
        );
    }

    print() {
        console.table(this.data);
    }
}

async function asyncOperation(value) {
    return new Promise(resolve => setTimeout(() => resolve(value * 2), 1000));
}

async function main() {
    const matrixA = new Matrix(3, 3).map((_, i, j) => i + j);
    const identity = Matrix.identity(3);

    print("Matrix A:");
    matrixA.print();

    print("Identity Matrix:");
    identity.print();

    const resultMatrix = matrixA.multiply(identity);
    print("Result of Multiplication:");
    resultMatrix.print();

    try {
        const asyncResults = await Promise.all([
            asyncOperation(2),
            asyncOperation(3),
            asyncOperation(5)
        ]);

        print("Async Operations Results:", asyncResults);
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

main();
