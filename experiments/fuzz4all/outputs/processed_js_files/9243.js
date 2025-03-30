class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => fill)
        );
    }
    
    static fromArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.data = arr;
        return matrix;
    }
    
    map(callback) {
        this.data = this.data.map((row, i) => 
            row.map((val, j) => callback(val, i, j))
        );
        return this;
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error('Columns of A must match rows of B.');
        }
        
        return new Matrix(a.data.length, b.data[0].length).map((_, i, j) =>
            a.data[i].reduce((sum, elm, k) => sum + (elm * b.data[k][j]), 0)
        );
    }
    
    [Symbol.iterator]() {
        return this.data.values();
    }
}

 
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

 
const matrix1 = new Matrix(3, 2).map(() => randomInt(1, 5));
const matrix2 = new Matrix(2, 3).map(() => randomInt(1, 5));

 
const productMatrix = Matrix.multiply(matrix1, matrix2);

 
console.log(`Matrix 1:
${[...matrix1].map(row => row.join(' ')).join('\n')}
\nMatrix 2:
${[...matrix2].map(row => row.join(' ')).join('\n')}
\nProduct Matrix:
${[...productMatrix].map(row => row.join(' ')).join('\n')}`);
