class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
    }

    static from(array) {
        let matrix = new Matrix(array.length, array[0].length);
        matrix.data = array;
        return matrix;
    }

    add(matrix) {
        if (this.data.length !== matrix.data.length || this.data[0].length !== matrix.data[0].length) {
            throw new Error('Matrices must have the same dimensions.');
        }
        return Matrix.from(this.data.map((row, i) => row.map((value, j) => value + matrix.data[i][j])));
    }

    multiply(matrix) {
        if (this.data[0].length !== matrix.data.length) {
            throw new Error('Matrix A columns must equal Matrix B rows.');
        }
        let result = new Matrix(this.data.length, matrix.data[0].length);
        result.data = result.data.map((row, i) =>
            row.map((_, j) => this.data[i].reduce((sum, element, k) => sum + element * matrix.data[k][j], 0))
        );
        return result;
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    let a = new Matrix(2, 3, 1);
    let b = new Matrix(3, 2, 2);
    
    print('Matrix A:\n' + a);
    print('Matrix B:\n' + b);
    
    await delay(1000);
    
    try {
        let product = a.multiply(b);
        print('A * B:\n' + product);
    } catch (error) {
        console.error(error.message);
    }
})();
