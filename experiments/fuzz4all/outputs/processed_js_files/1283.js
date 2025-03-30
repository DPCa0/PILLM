class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(arr) {
        const rows = arr.length;
        const cols = arr[0].length;
        let matrix = new Matrix(rows, cols);
        matrix.data = arr;
        return matrix;
    }

    static identity(size) {
        let matrix = new Matrix(size, size);
        for (let i = 0; i < size; i++) {
            matrix.data[i][i] = 1;
        }
        return matrix;
    }

    multiply(matrixB) {
        if (this.data[0].length !== matrixB.data.length) {
            throw new Error('Incompatible matrix sizes for multiplication');
        }
        let result = new Matrix(this.data.length, matrixB.data[0].length);
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < matrixB.data[0].length; j++) {
                result.data[i][j] = this.data[i].reduce((sum, el, k) => sum + el * matrixB.data[k][j], 0);
            }
        }
        return result;
    }

    display() {
        console.table(this.data);
    }
}

(async function () {
    try {
        const response = await fetch('https://api.example.com/matrix');
        const data = await response.json();
        const matrixA = Matrix.fromArray(data.matrixA);
        const matrixB = Matrix.fromArray(data.matrixB);

        print('Matrix A:');
        matrixA.display();

        print('Matrix B:');
        matrixB.display();

        print('A x B:');
        const result = matrixA.multiply(matrixB);
        result.display();

        print('Identity Matrix:');
        Matrix.identity(3).display();
    } catch (error) {
        console.error('Error:', error);
    }
})();
