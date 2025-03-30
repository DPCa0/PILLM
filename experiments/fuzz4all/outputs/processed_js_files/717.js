class AsyncMatrix {
    constructor(rows, cols, fill = 0) {
        this.matrix = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }
    
    static async multiply(a, b) {
        if (a.matrix[0].length !== b.matrix.length) {
            throw new Error("Incompatible matrices for multiplication.");
        }
        let result = new AsyncMatrix(a.matrix.length, b.matrix[0].length);
        
        await Promise.all(result.matrix.map((row, i) =>
            Promise.all(row.map(async (_, j) => {
                const res = await Promise.all(a.matrix[i].map((val, k) => val * b.matrix[k][j]));
                result.matrix[i][j] = res.reduce((sum, val) => sum + val, 0);
            }))
        ));
        
        return result;
    }
    
    log() {
        print(this.matrix.map(row => row.join("\t")).join("\n"));
    }
}

(async () => {
    let matrixA = new AsyncMatrix(2, 3, 1);
    let matrixB = new AsyncMatrix(3, 2, 2);
    print("Matrix A:");
    matrixA.log();
    print("\nMatrix B:");
    matrixB.log();
    
    try {
        let result = await AsyncMatrix.multiply(matrixA, matrixB);
        print("\nResult of A * B:");
        result.log();
    } catch (error) {
        console.error(error);
    }
})();
