class AsyncMatrix {
    constructor(rows, cols, fillValue = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
    }

    async fillAsync(fn) {
        await Promise.all(
            this.data.map((row, i) =>
                Promise.all(
                    row.map(async (cell, j) => {
                        this.data[i][j] = await fn(i, j);
                    })
                )
            )
        );
    }

    static async multiplyAsync(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrices');

        const result = new AsyncMatrix(a.data.length, b.data[0].length);
        await result.fillAsync(async (i, j) =>
            a.data[i].reduce(async (sum, _, n) => {
                const valA = a.data[i][n];
                const valB = b.data[n][j];
                return (await sum) + valA * valB;
            }, Promise.resolve(0))
        );
        return result;
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

(async () => {
    const matrixA = new AsyncMatrix(2, 3);
    await matrixA.fillAsync(async (i, j) => i + j + 1);

    const matrixB = new AsyncMatrix(3, 2);
    await matrixB.fillAsync(async (i, j) => i * 2 - j);

    const resultMatrix = await AsyncMatrix.multiplyAsync(matrixA, matrixB);
    print(resultMatrix.toString());
})();
