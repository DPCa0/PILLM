class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(array) {
        let m = new Matrix(array.length, array[0].length);
        m.data = array;
        return m;
    }

    map(fn) {
        return Matrix.fromArray(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error('Columns of A must match rows of B');
        return new Matrix(a.data.length, b.data[0].length).map((_, i, j) => {
            return a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0);
        });
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}

(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
    const logProgress = async (msg, time) => {
        for (let i = 0; i < msg.length; i++) {
            process.stdout.write(msg[i]);
            await delay(time);
        }
        process.stdout.write('\n');
    };

    const m1 = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
    const m2 = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);
    const result = Matrix.multiply(m1, m2);

    await logProgress('Calculating Matrix Multiplication...', 100);
    print(result.toString());
})();
