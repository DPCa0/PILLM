class Matrix {
    constructor(rows, cols, fillValue = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => fillValue)
        );
    }

    static fromArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.data = arr;
        return matrix;
    }

    map(callback) {
        return this.data.map((row, i) => row.map((val, j) => callback(val, i, j)));
    }

    multiply(b) {
        if (!(b instanceof Matrix)) throw new Error("Argument must be a Matrix");
        if (this.data[0].length !== b.data.length) throw new Error("Matrix dimension mismatch");

        const result = new Matrix(this.data.length, b.data[0].length);
        return result.map((_, i, j) => 
            this.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0)
        );
    }

    print() {
        console.table(this.data);
    }
}

 
const matrixA = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6],
]);

const matrixB = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12],
]);

const matrixC = matrixA.multiply(matrixB);
matrixC.print();
