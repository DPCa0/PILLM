class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromArray(array) {
        return new Matrix(array);
    }

    toArray() {
        return this.data;
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    static multiply(m1, m2) {
        if (m1.data[0].length !== m2.data.length) {
            throw new Error('Incompatible matrix dimensions for multiplication');
        }
        return new Matrix(m1.data.map((row) =>
            m2.data[0].map((_, colIndex) =>
                row.reduce((sum, val, rowIndex) => sum + val * m2.data[rowIndex][colIndex], 0)
            )
        ));
    }

    log() {
        console.table(this.data);
        return this;
    }
}

(async function() {
     
    let A = Matrix.fromArray([
        [1, 2],
        [3, 4]
    ]);
    let B = Matrix.fromArray([
        [5, 6],
        [7, 8]
    ]);

     
    print('Matrix A:');
    A.log();

    print('Matrix B:');
    B.log();

    print('A * B:');
    Matrix.multiply(A, B).log();

     
    print('Matrix A with incremented values:');
    A.map((val) => val + 1).log();

     
    await new Promise(resolve => setTimeout(resolve, 1000));

    print('Finished complex operations after delay');
})();
