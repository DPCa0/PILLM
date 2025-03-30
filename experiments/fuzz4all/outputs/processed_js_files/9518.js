class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(array) {
        return new Matrix(array.map(row => [...row]));
    }

    static identity(size) {
        return new Matrix(Array.from({ length: size }, (_, i) =>
            Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
        ));
    }

    multiply(matrix) {
        const result = this.data.map((row, i) => 
            matrix.data[0].map((_, j) => 
                row.reduce((acc, _, n) => acc + this.data[i][n] * matrix.data[n][j], 0)
            )
        );
        return new Matrix(result);
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    const logMatrix = async (matrix, delay = 1000) => {
        console.clear();
        print(matrix.toString());
        await sleep(delay);
    };

    let identity = Matrix.identity(3);
    let transform = Matrix.from([
        [0, 1, 0],
        [-1, 0, 0],
        [0, 0, 1]
    ]);

    for (let i = 0; i < 4; i++) {
        await logMatrix(identity);
        identity = identity.multiply(transform);
    }
})();
