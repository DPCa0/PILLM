class Matrix {
    constructor(data) {
        this.data = data;
    }

    static identity(size) {
        return new Matrix(Array.from({ length: size }, (_, i) =>
            Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
        ));
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        return {
            next: () => {
                if (row >= this.data.length) return { done: true };
                const value = this.data[row][col];
                col++;
                if (col >= this.data[row].length) {
                    col = 0;
                    row++;
                }
                return { value, done: false };
            }
        };
    }

    multiply(matrix) {
        const result = this.data.map((row, i) =>
            matrix.data[0].map((_, j) =>
                row.reduce((sum, elm, k) => sum + elm * matrix.data[k][j], 0)
            )
        );
        return new Matrix(result);
    }

    static async load(url) {
        const response = await fetch(url);
        const json = await response.json();
        return new Matrix(json.data);
    }
}

(async () => {
    const identityMatrix = Matrix.identity(3);
    for (const value of identityMatrix) {
        print(value);
    }

    const matrixA = await Matrix.load('https://example.com/matrixA.json');
    const matrixB = await Matrix.load('https://example.com/matrixB.json');
    const resultMatrix = matrixA.multiply(matrixB);

    print('Resultant Matrix:', resultMatrix.data);
})();
