class Matrix {
    constructor(data) {
        this.data = data;
    }
    
    static multiply(A, B) {
        if (A.data[0].length !== B.data.length) throw new Error('Incompatible matrices');
        return new Matrix(A.data.map(row =>
            B.data[0].map((_, colIndex) =>
                row.reduce((sum, elem, rowIndex) => sum + elem * B.data[rowIndex][colIndex], 0)
            )
        ));
    }
    
    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield row;
        }
    }
}

const asyncMultiply = async (matrices) => {
    const [[A, B]] = matrices;
    return await Promise.resolve(Matrix.multiply(A, B));
};

(async () => {
    const A = new Matrix([
        [1, 2, 3],
        [4, 5, 6]
    ]);
    
    const B = new Matrix([
        [7, 8],
        [9, 10],
        [11, 12]
    ]);

    const resultMatrix = await asyncMultiply([[A, B]]);
    for (let row of resultMatrix) {
        print(row.join(', '));
    }
})();
