class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => defaultValue)
        );
    }

    static from2DArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.data = arr.map(row => [...row]);
        return matrix;
    }

    map(callback) {
        this.data = this.data.map((row, i) => row.map((value, j) => callback(value, i, j)));
        return this;
    }

    multiply(matrixB) {
        if (this.data[0].length !== matrixB.data.length) throw new Error("Incompatible matrix sizes");
        const result = new Matrix(this.data.length, matrixB.data[0].length);
        result.map((_, i, j) => this.data[i].reduce((sum, val, k) => sum + val * matrixB.data[k][j], 0));
        return result;
    }

    display() {
        print(this.data);
        return this;
    }

    *[Symbol.iterator]() {
        for (let row of this.data) yield* row;
    }
}

 
(async () => {
    try {
        const matrixA = Matrix.from2DArray([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        const matrixB = Matrix.from2DArray([
            [7, 8],
            [9, 10],
            [11, 12]
        ]);

        print("Matrix A:");
        matrixA.display();
        
        print("Matrix B:");
        matrixB.display();

        const delayedMultiplication = new Promise((resolve) => setTimeout(() => resolve(matrixA.multiply(matrixB)), 1000));

        print("Multiplying matrices with delay...");
        const resultMatrix = await delayedMultiplication;
        print("Result Matrix:");
        resultMatrix.display();
    } catch (error) {
        console.error(error);
    }
})();
