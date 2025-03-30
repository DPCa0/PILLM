class Matrix {
    constructor(rows, cols, fillFunction = () => Math.random()) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, fillFunction)
        );
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) throw new Error('Matrix dimensions must match');
        return new Matrix(a.rows, b.cols, (_, x, y) => 
            a.data[x].reduce((sum, val, index) => sum + val * b.data[index][y], 0)
        );
    }

    static from(array) {
        const rows = array.length;
        const cols = rows > 0 ? array[0].length : 0;
        return new Matrix(rows, cols, (_, i, j) => array[i][j]);
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const simulateHeavyComputation = async () => {
    print('Starting computation...');
    const start = performance.now();

    await delay(1000);

    const matrixA = new Matrix(3, 2);
    const matrixB = new Matrix(2, 3);
    const result = Matrix.multiply(matrixA, matrixB);

    print('Matrix A:\n', matrixA.toString());
    print('Matrix B:\n', matrixB.toString());
    print('Resultant Matrix:\n', result.toString());

    print(`Computation completed in ${(performance.now() - start).toFixed(2)} ms`);
};

simulateHeavyComputation();
