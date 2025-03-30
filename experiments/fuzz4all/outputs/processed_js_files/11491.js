class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static randomize(rows, cols, min = 0, max = 1) {
        return new Matrix(rows, cols).map(() => Math.random() * (max - min) + min);
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    add(matrix) {
        if (matrix instanceof Matrix) {
            if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
                throw new Error('Matrices must have the same dimensions');
            }
            return this.map((val, i, j) => val + matrix.data[i][j]);
        } else {
            return this.map(val => val + matrix);
        }
    }

    multiply(matrix) {
        if (matrix instanceof Matrix) {
            if (this.cols !== matrix.rows) {
                throw new Error('Matrices must have matching dimensions');
            }
            return new Matrix(this.rows, matrix.cols).map((_, i, j) =>
                this.data[i].reduce((sum, val, k) => sum + val * matrix.data[k][j], 0)
            );
        } else {
            return this.map(val => val * matrix);
        }
    }
}

const asyncMatrixOperation = async (matrixA, matrixB) => {
    const [result1, result2] = await Promise.all([
        new Promise(resolve => setTimeout(() => resolve(matrixA.add(matrixB)), 1000)),
        new Promise(resolve => setTimeout(() => resolve(matrixA.multiply(matrixB)), 2000))
    ]);

    return { additionResult: result1, multiplicationResult: result2 };
};

(async () => {
    try {
        const A = Matrix.randomize(2, 3);
        const B = Matrix.randomize(2, 3);
        const C = Matrix.randomize(3, 2);

        const { additionResult, multiplicationResult } = await asyncMatrixOperation(A, B);
        
        print('Addition Result:', additionResult.data);
        print('Multiplication Result (with C):', A.multiply(C).data);

    } catch (error) {
        console.error(error);
    }