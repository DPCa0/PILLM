class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromArray(arr) {
        return new Matrix(arr.map(row => [...row]));
    }

    static identity(size) {
        return new Matrix(Array.from({length: size}, (_, i) =>
            Array.from({length: size}, (_, j) => (i === j ? 1 : 0))
        ));
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) {
            throw new Error('Incompatible matrix dimensions for multiplication');
        }
        return new Matrix(this.data.map(row =>
            other.data[0].map((_, j) =>
                row.reduce((sum, elm, k) => sum + elm * other.data[k][j], 0)
            )
        ));
    }

    static async delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async logDelayed(ms = 1000) {
        for (const row of this.data) {
            await Matrix.delay(ms);
            print(row.join(' '));
        }
    }

    [Symbol.iterator]() {
        return this.data[Symbol.iterator]();
    }
}

 
(async function main() {
    const matrixA = Matrix.fromArray([
        [1, 2, 3],
        [4, 5, 6],
    ]);

    const matrixB = Matrix.fromArray([
        [7, 8],
        [9, 10],
        [11, 12],
    ]);

    const resultMatrix = matrixA.multiply(matrixB);
    print('Result Matrix:');
    await resultMatrix.logDelayed();

    print('Identity Matrix:');
    const identityMatrix = Matrix.identity(3);
    for (const row of identityMatrix) {
        print(row.join(' '));
    }
})();
