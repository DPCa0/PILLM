class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
        );
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let val of row) {
                yield val;
            }
        }
    }

    static async fromPromise(promise) {
        const data = await promise;
        const matrix = new Matrix(data.length, data[0].length);
        matrix.data = data;
        return matrix;
    }

    map(callback) {
        return this.data.map((row, i) => 
            row.map((val, j) => callback(val, i, j))
        );
    }
}

(async () => {
    const fetchMatrixData = async () => 
        new Promise(resolve => 
            setTimeout(() => resolve([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]), 500)
        );

    const matrixData = fetchMatrixData();
    const matrix = await Matrix.fromPromise(matrixData);

    print('Original Matrix:', matrix.data);

    const doubledMatrix = new Matrix(matrix.rows, matrix.cols);
    doubledMatrix.data = matrix.map(value => value * 2);
    print('Doubled Matrix:', doubledMatrix.data);

    print('Iterating through Doubled Matrix values:');
    for (let val of doubledMatrix) {
        print(val);
    }
})();
