class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static from(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.data = arr;
        return matrix;
    }

    add(other) {
        this._validateDimension(other);
        return Matrix.from(this.data.map((row, i) =>
            row.map((value, j) => value + other.data[i][j])
        ));
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) {
            throw new Error('Columns of A must match rows of B');
        }
        const result = new Matrix(this.data.length, other.data[0].length);
        result.data = result.data.map((row, i) =>
            row.map((_, j) =>
                this.data[i].reduce((sum, _, n) => sum + this.data[i][n] * other.data[n][j], 0)
            )
        );
        return result;
    }

    _validateDimension(other) {
        if (this.data.length !== other.data.length || this.data[0].length !== other.data[0].length) {
            throw new Error('Matrices dimensions must match');
        }
    }
}

(async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    async function* asyncGenerator() {
        yield* ['Processing', 'Computing', 'Finalizing'];
    }

    for await (const state of asyncGenerator()) {
        print(state);
        await delay(500);
    }

    const A = Matrix.from([[1, 2, 3], [4, 5, 6]]);
    const B = Matrix.from([[7, 8], [9, 10], [11, 12]]);
    const C = A.multiply(B);

    print('Resultant Matrix:');
    console.table(C.data);
})();
