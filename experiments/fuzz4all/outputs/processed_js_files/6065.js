class Matrix {
    constructor(rows, cols) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static identity(size) {
        return new Matrix(size, size).map((val, i, j) => (i === j ? 1 : 0));
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(matrix) {
        if (this.data[0].length !== matrix.data.length) {
            throw new Error("Incompatible matrix sizes for multiplication");
        }
        const result = new Matrix(this.data.length, matrix.data[0].length);
        return result.map((_, i, j) => 
            this.data[i].reduce((sum, elm, k) => sum + elm * matrix.data[k][j], 0)
        );
    }
}

(async function demoMatrix() {
    const A = new Matrix(2, 3).map((_, i, j) => i + j + 1);
    const B = new Matrix(3, 2).map((_, i, j) => (i === j ? 1 : i + j + 2));

    const C = A.multiply(B);
    print('Matrix A:', A.data);
    print('Matrix B:', B.data);
    print('A * B =', C.data);

    const identity = Matrix.identity(3);
    print('Identity Matrix:', identity.data);

     
    await new Promise(resolve => setTimeout(resolve, 1000));
    print('Finished!');
})();
