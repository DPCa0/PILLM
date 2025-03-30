class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.data = arr.map(row => [...row]);
        return matrix;
    }

    map(fn) {
        return Matrix.fromArray(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    static multiply(m1, m2) {
        if (m1.data[0].length !== m2.data.length) throw new Error('Columns of A must match rows of B');
        let result = new Matrix(m1.data.length, m2.data[0].length);
        result.data = result.data.map((row, i) =>
            row.map((_, j) =>
                m1.data[i].reduce((sum, _, n) => sum + m1.data[i][n] * m2.data[n][j], 0)
            )
        );
        return result;
    }

    print() {
        console.table(this.data);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchMockData() {
    await delay(1000);
    return [
        [1, 2],
        [3, 4]
    ];
}

(async () => {
    try {
        const matrix1 = Matrix.fromArray(await fetchMockData());
        const matrix2 = new Matrix(2, 2, 1);

        matrix1.print();
        matrix2.print();

        const multipliedMatrix = Matrix.multiply(matrix1, matrix2);
        multipliedMatrix.print();
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
