 
class Matrix {
    constructor(rows, cols, fillFunc = () => Math.random()) {
        this.data = Array.from({ length: rows }, () => 
            Array.from({ length: cols }, fillFunc)
        );
    }

    static multiply(A, B) {
        if (A.data[0].length !== B.data.length) throw new Error('Incompatible matrices');
        const result = new Matrix(A.data.length, B.data[0].length, () => 0);
        result.data = result.data.map((row, i) => 
            row.map((_, j) => 
                A.data[i].reduce((sum, val, k) => sum + val * B.data[k][j], 0)
            )
        );
        return result;
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let value of row) {
                yield value;
            }
        }
    }

    print() {
        this.data.forEach(row => print(row.join(' ')));
    }
}

(async function demo() {
    const matrixA = new Matrix(3, 2, () => Math.floor(Math.random() * 10));
    const matrixB = new Matrix(2, 3, () => Math.floor(Math.random() * 10));
    print("Matrix A:");
    matrixA.print();
    print("Matrix B:");
    matrixB.print();

    const matrixC = Matrix.multiply(matrixA, matrixB);
    print("Matrix C (A * B):");
    matrixC.print();

     
    async function* asyncMatrixIterator(matrix) {
        for (let value of matrix) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            yield value;
        }
    }

    print("Matrix C values:");
    for await (let value of asyncMatrixIterator(matrixC)) {
        process.stdout.write(value + ' ');
    }
})();
