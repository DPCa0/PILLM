class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
    }

    static fromArray(array) {
        const rows = array.length;
        const cols = array[0].length;
        let matrix = new Matrix(rows, cols);
        matrix.map((_, i, j) => array[i][j]);
        return matrix;
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(matrix) {
        if (this.data[0].length !== matrix.data.length) throw new Error("Incompatible matrices");
        let result = new Matrix(this.data.length, matrix.data[0].length);
        return result.map((_, i, j) =>
            this.data[i].reduce((sum, elem, k) => sum + elem * matrix.data[k][j], 0)
        );
    }

    log() {
        console.table(this.data);
        return this;
    }
}

(async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const matA = new Matrix(3, 2).map(() => Math.floor(Math.random() * 10));
    const matB = new Matrix(2, 3).map(() => Math.floor(Math.random() * 10));
    
    print("Matrix A:");
    matA.log();
    print("Matrix B:");
    matB.log();

    print("Multiplying Matrices...");
    await delay(1000);  

    const result = matA.multiply(matB);
    print("Result:");
    result.log();
})();
