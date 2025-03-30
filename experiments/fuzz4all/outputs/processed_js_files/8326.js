class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
        );
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            throw new Error('Columns of A must match rows of B.');
        }
        return new Matrix(a.rows, b.cols).map((_, i, j) => {
            return a.data[i].reduce((sum, elm, k) => sum + (elm * b.data[k][j]), 0);
        });
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                yield this.data[i][j];
            }
        }
    }
}

(async () => {
    const m1 = new Matrix(3, 2);
    const m2 = new Matrix(2, 3);

    const result = Matrix.multiply(m1, m2);

    const doubled = result.map(value => value * 2);

    print('Matrix A:');
    console.table(m1.data);
    print('Matrix B:');
    console.table(m2.data);
    print('Resultant Matrix:');
    console.table(doubled.data);

    const asyncLog = async (matrix) => {
        for await (let value of matrix) {
            await new Promise(res => setTimeout(res, 100));
            print(value);
        }
    };

    print('Matrix values iterated asynchronously:');
    await asyncLog(doubled);
})();
