class Matrix {
    constructor(rows, cols, fillFunc) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, (_, i) => 
            Array.from({ length: cols }, (_, j) => fillFunc(i, j))
        );
    }

    static multiply(m1, m2) {
        if (m1.cols !== m2.rows) {
            throw new Error('Columns of A must match rows of B.');
        }
        return new Matrix(m1.rows, m2.cols, (i, j) => 
            m1.data[i].reduce((sum, _, n) => sum + m1.data[i][n] * m2.data[n][j], 0)
        );
    }

    [Symbol.iterator]() {
        let i = 0, j = 0;
        return {
            next: () => {
                if (i < this.rows) {
                    const value = this.data[i][j];
                    j++;
                    if (j === this.cols) {
                        j = 0;
                        i++;
                    }
                    return { value, done: false };
                }
                return { done: true };
            }
        };
    }
}

const matrixA = new Matrix(2, 3, () => Math.floor(Math.random() * 10));
const matrixB = new Matrix(3, 2, () => Math.floor(Math.random() * 10));

print('Matrix A:');
matrixA.data.forEach(row => print(row));

print('Matrix B:');
matrixB.data.forEach(row => print(row));

try {
    const resultMatrix = Matrix.multiply(matrixA, matrixB);
    print('Result Matrix:');
    resultMatrix.data.forEach(row => print(row));

    print('Flattened Result:');
    for (const value of resultMatrix) {
        process.stdout.write(value + ' ');
    }
} catch (error) {
    console.error(error.message);
}
