class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(array) {
        return new Matrix(array);
    }

    map(callback) {
        return new Matrix(this.data.map((row, i) => row.map((value, j) => callback(value, i, j))));
    }

    add(matrix) {
        if (matrix instanceof Matrix) {
            return this.map((value, i, j) => value + matrix.data[i][j]);
        }
        return this.map(value => value + matrix);
    }

    multiply(matrix) {
        if (matrix instanceof Matrix) {
            if (this.data[0].length !== matrix.data.length) throw new Error('Incompatible matrix sizes for multiplication');
            const result = this.data.map((row, i) => matrix.data[0].map((_, j) =>
                row.reduce((sum, elm, k) => sum + elm * matrix.data[k][j], 0)
            ));
            return new Matrix(result);
        }
        return this.map(value => value * matrix);
    }

    transpose() {
        return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
    }

    print() {
        console.table(this.data);
    }
}

const matrixA = Matrix.from([
    [1, 2, 3],
    [4, 5, 6]
]);

const matrixB = Matrix.from([
    [7, 8],
    [9, 10],
    [11, 12]
]);

const matrixC = matrixA.multiply(matrixB);
matrixC.print();  

const matrixD = matrixA.add(10);
matrixD.print();  

const transposedMatrix = matrixB.transpose();
transposedMatrix.print();  
