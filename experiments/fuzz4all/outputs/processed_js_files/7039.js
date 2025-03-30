class Matrix {
    constructor(rows, cols) {
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
        );
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        const rows = this.data.length, cols = this.data[0].length;
        return {
            next: () => {
                if (row < rows) {
                    const value = { value: this.data[row][col], done: false };
                    col++;
                    if (col === cols) {
                        col = 0;
                        row++;
                    }
                    return value;
                }
                return { done: true };
            }
        };
    }

    static async add(matrixA, matrixB) {
        if (matrixA.data.length !== matrixB.data.length || matrixA.data[0].length !== matrixB.data[0].length) {
            throw new Error('Matrices must have the same dimensions');
        }
        const result = new Matrix(matrixA.data.length, matrixA.data[0].length);
        await Promise.all(matrixA.data.map((row, i) =>
            Promise.all(row.map((val, j) => {
                result.data[i][j] = val + matrixB.data[i][j];
            }))
        ));
        return result;
    }
}

(async () => {
    const matrix1 = new Matrix(3, 3);
    const matrix2 = new Matrix(3, 3);

    print('Matrix 1:');
    console.table(matrix1.data);
    print('Matrix 2:');
    console.table(matrix2.data);

    const result = await Matrix.add(matrix1, matrix2);
    print('Sum of Matrix 1 and Matrix 2:');
    console.table(result.data);

    print('Iterating over Result Matrix:');
    for (const value of result) {
        print(value);
    }
})();
