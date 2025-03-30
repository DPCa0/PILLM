class Matrix {
    constructor(rows, cols) {
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
        );
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let value of row) {
                yield value;
            }
        }
    }

    static async multiply(a, b) {
        const aRows = a.data.length, aCols = a.data[0].length,
              bRows = b.data.length, bCols = b.data[0].length;

        if (aCols !== bRows) throw new Error('Columns of A must match rows of B.');

        const result = new Matrix(aRows, bCols);
        const work = [];

        for (let i = 0; i < aRows; i++) {
            for (let j = 0; j < bCols; j++) {
                const computeCell = async () => {
                    let sum = 0;
                    for (let k = 0; k < aCols; k++) {
                        sum += a.data[i][k] * b.data[k][j];
                    }
                    result.data[i][j] = sum;
                };
                work.push(computeCell());
            }
        }
        await Promise.all(work);
        return result;
    }
}

(async () => {
    const a = new Matrix(3, 3);
    const b = new Matrix(3, 3);

    print('Matrix A:');
    console.table(a.data);
    print('Matrix B:');
    console.table(b.data);

    const result = await Matrix.multiply(a, b);
    print('Matrix A x B:');
    console.table(result.data);

    print('Flattened Result:');
    print([...result]);
})();
