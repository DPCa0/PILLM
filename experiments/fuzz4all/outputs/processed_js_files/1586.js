class Matrix {
    constructor(rows, cols, fillFunc) {
        this.data = Array.from({ length: rows }, (_, i) => 
            Array.from({ length: cols }, (_, j) => fillFunc(i, j)));
    }

    *[Symbol.iterator]() {
        for (let row of this.data) yield* row;
    }

    static async transform(matrix, transformFunc) {
        return Promise.all(matrix.data.map(
            async (row, i) => Promise.all(row.map(
                async (val, j) => transformFunc(val, i, j)
            ))
        ));
    }
}

const logMatrix = async (matrix) => {
    const transformed = await Matrix.transform(matrix, async (val) => {
        await new Promise(res => setTimeout(res, Math.random() * 100));  
        return val ** 2;
    });

    for (let val of transformed) {
        print(val);
    }
};

(async () => {
    const randomMatrix = new Matrix(3, 3, () => Math.floor(Math.random() * 10));
    await logMatrix(randomMatrix);
})();
