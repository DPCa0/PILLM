class Matrix {
    constructor(data) {
        this.data = data;
    }

    static async multiplyAsync(matrixA, matrixB) {
        const [rowA, colA] = [matrixA.data.length, matrixA.data[0].length];
        const [rowB, colB] = [matrixB.data.length, matrixB.data[0].length];
        
        if (colA !== rowB) {
            throw new Error('Matrix dimensions do not match for multiplication.');
        }

        let result = Array.from({ length: rowA }, () => Array(colB).fill(0));
        const workers = navigator.hardwareConcurrency || 4;

        const multiplySegment = async (startRow, endRow) => {
            for (let i = startRow; i < endRow; i++) {
                for (let j = 0; j < colB; j++) {
                    for (let k = 0; k < colA; k++) {
                        result[i][j] += matrixA.data[i][k] * matrixB.data[k][j];
                    }
                }
            }
        };

        await Promise.all(
            Array.from({ length: workers }, (_, i) =>
                multiplySegment(
                    Math.floor((i * rowA) / workers),
                    Math.floor(((i + 1) * rowA) / workers)
                )
            )
        );

        return new Matrix(result);
    }

    static *range(start, end) {
        for (let i = start; i < end; i++) {
            yield i;
        }
    }

    static print(matrix) {
        matrix.data.forEach(row => print(row.join(' ')));
    }
}

(async () => {
    const matrixA = new Matrix([
        [1, 2, 3],
        [4, 5, 6]
    ]);

    const matrixB = new Matrix([
        [7, 8],
        [9, 10],
        [11, 12]
    ]);

    try {
        const result = await Matrix.multiplyAsync(matrixA, matrixB);
        print('Matrix A x Matrix B =');
        Matrix.print(result);
    } catch (error) {
        console.error(error);
    }

    print('Range from 1 to 5:');
    print([...Matrix.range(1, 5)]);
})();
