class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(arr) {
        return new Matrix(arr);
    }

    get rows() {
        return this.data.length;
    }

    get cols() {
        return this.data[0].length;
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield row;
        }
    }

    static multiply(a, b) {
        if (a.cols !== b.rows) {
            throw new Error("Matrices dimensions do not match for multiplication.");
        }

        const result = Array.from({ length: a.rows }, () =>
            Array.from({ length: b.cols }, () => 0)
        );

        for (let i = 0; i < a.rows; i++) {
            for (let j = 0; j < b.cols; j++) {
                for (let k = 0; k < a.cols; k++) {
                    result[i][j] += a.data[i][k] * b.data[k][j];
                }
            }
        }
        return Matrix.from(result);
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}

 
async function asyncMatrixOperation() {
    const matrixA = Matrix.from([
        [1, 2, 3],
        [4, 5, 6],
    ]);

    const matrixB = Matrix.from([
        [7, 8],
        [9, 10],
        [11, 12],
    ]);

    print("Matrix A:");
    print(matrixA.toString());

    print("\nMatrix B:");
    print(matrixB.toString());

    try {
        const multiplyPromise = () =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const result = Matrix.multiply(matrixA, matrixB);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                }, 1000);
            });

        const resultMatrix = await multiplyPromise();

        print("\nResult of A * B:");
        print(resultMatrix.toString());
    } catch (error) {
        console.error("Error during matrix multiplication:", error.message);
    }
}

asyncMatrixOperation();
