class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
    }

    static fromArray(arr) {
        let m = new Matrix(arr.length, 1);
        m.map((_, i) => arr[i]);
        return m;
    }

    static random(rows, cols, range = 1) {
        let m = new Matrix(rows, cols);
        m.map(() => Math.random() * range);
        return m;
    }

    map(func) {
        this.data = this.data.map((row, i) => row.map((val, j) => func(val, i, j)));
        return this;
    }

    static map(m, func) {
        let result = new Matrix(m.rows, m.cols);
        result.map((_, i, j) => func(m.data[i][j], i, j));
        return result;
    }

    static add(m1, m2) {
        if (m1.rows !== m2.rows || m1.cols !== m2.cols) {
            throw new Error('Matrix dimensions must match');
        }
        return Matrix.map(m1, (val, i, j) => val + m2.data[i][j]);
    }

    static multiply(m1, m2) {
        if (m1.cols !== m2.rows) {
            throw new Error('Columns of A must match rows of B.');
        }
        let result = new Matrix(m1.rows, m2.cols);
        result.map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < m1.cols; k++) {
                sum += m1.data[i][k] * m2.data[k][j];
            }
            return sum;
        });
        return result;
    }
}

 
async function performMatrixOperations() {
    const A = Matrix.random(2, 3);
    const B = Matrix.random(3, 2);
    const C = Matrix.random(2, 2);

    const resultPromise = new Promise((resolve) => {
        const result = Matrix.multiply(A, B);
        const finalResult = Matrix.add(result, C);
        resolve(finalResult);
    });

    try {
        const finalResult = await result