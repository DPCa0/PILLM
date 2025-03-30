class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromString(matrixStr) {
        return new Matrix(matrixStr.split('\n').map(row => row.split(' ').map(Number)));
    }

    get dimensions() {
        return { rows: this.data.length, cols: this.data[0].length };
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield row;
        }
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }

    transpose() {
        const { rows, cols } = this.dimensions;
        let transposed = Array.from({ length: cols }, () => Array(rows).fill(0));
        
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                transposed[j][i] = this.data[i][j];
            }
        }
        return new Matrix(transposed);
    }
}

(async () => {
    const rawMatrix = `
        1 2 3
        4 5 6
        7 8 9
    `;

    const matrix = Matrix.fromString(rawMatrix.trim());
    print('Original Matrix:');
    print(matrix.toString());

    print('\nTransposed Matrix:');
    print(matrix.transpose().toString());

    print('\nIterating over Matrix Rows:');
    for (const row of matrix) {
        print(row.join(' '));
    }
    
    print('\nUsing an asynchronous fetch call simulation:');
    const simulatedFetch = () => new Promise(resolve => setTimeout(() => resolve('Data from server'), 1000));
    
    const serverData = await simulatedFetch();
    print(serverData);
})();
