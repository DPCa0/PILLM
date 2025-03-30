class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromArrays(arrays) {
        return new Matrix(arrays);
    }

    multiply(other) {
        const result = this.data.map(row =>
            other.data[0].map((_, colIndex) =>
                row.reduce((sum, cell, rowIndex) => sum + cell * other.data[rowIndex][colIndex], 0)
            )
        );
        return new Matrix(result);
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let cell of row) {
                yield cell;
            }
        }
    }

    static async generateRandomMatrix(rows, cols) {
        const generateRandomNumber = () => Math.floor(Math.random() * 10);
        const randomMatrix = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, generateRandomNumber)
        );
        return new Matrix(randomMatrix);
    }
}

(async () => {
    const matrix1 = await Matrix.generateRandomMatrix(3, 2);
    const matrix2 = await Matrix.generateRandomMatrix(2, 3);

    const resultMatrix = matrix1.multiply(matrix2);

    print('Result Matrix:');
    for (const value of resultMatrix) {
        process.stdout.write(value + ' ');
    }
})();
