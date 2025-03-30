class Matrix {
    constructor(rows, cols, fillFunc = () => Math.random()) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, fillFunc)
        );
    }
    
    static fromArray(arr) {
        const matrix = new Matrix(arr.length, 1);
        matrix.map((_, i, j) => arr[i]);
        return matrix;
    }
    
    toArray() {
        let arr = [];
        this.map((val, i, j) => arr.push(val));
        return arr;
    }

    map(fn) {
        return new Matrix(this.rows, this.cols, (v, i, j) => fn(this.data[i][j], i, j));
    }
    
    static multiply(a, b) {
        if (a.cols !== b.rows) throw 'Columns of A must match rows of B.';
        return new Matrix(a.rows, b.cols, (v, i, j) => 
            a.data[i].reduce((sum, val, k) => sum + val * b.data[k][j], 0)
        );
    }

    static transpose(matrix) {
        return new Matrix(matrix.cols, matrix.rows, (v, i, j) => matrix.data[j][i]);
    }
}

const matrixA = new Matrix(3, 2, () => Math.floor(Math.random() * 10));
const matrixB = new Matrix(2, 3, () => Math.floor(Math.random() * 10));
const multipliedMatrix = Matrix.multiply(matrixA, matrixB);
const transposedMatrix = Matrix.transpose(multipliedMatrix);

print('Matrix A:', matrixA.data);
print('Matrix B:', matrixB.data);
print('Multiplied Matrix:', multipliedMatrix.data);
print('Transposed Matrix:', transposedMatrix.data);
