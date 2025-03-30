class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => defaultValue)
        );
    }

    static from2DArray(array) {
        const matrix = new Matrix(array.length, array[0].length);
        matrix.data = array;
        return matrix;
    }

    map(callback) {
        return Matrix.from2DArray(
            this.data.map((row, rowIndex) =>
                row.map((value, colIndex) =>
                    callback(value, rowIndex, colIndex, this.data)
                )
            )
        );
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) {
            throw new Error("Matrix dimensions do not match for multiplication.");
        }

        return new Matrix(this.data.length, other.data[0].length).map(
            (value, row, col) =>
                this.data[row].reduce(
                    (sum, val, index) => sum + val * other.data[index][col],
                    0
                )
        );
    }

    toString() {
        return this.data.map(row => row.join("\t")).join("\n");
    }
}

(async () => {
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const mat1 = new Matrix(2, 3);
    const mat2 = new Matrix(3, 2);
    
    mat1.data = [
        [1, 2, 3],
        [4, 5, 6]
    ];
    mat2.data = [
        [7, 8],
        [9, 10],
        [11, 12]
    ];

    print("Matrix 1:");
    print(mat1.toString());

    print("\nMatrix 2:");
    print(mat2.toString());

    print("\nMultiplying matrices...");
    await sleep(1000);

    try {
        const result = mat1.multiply(mat2);
        print("\nResult:");
        print(result.toString());
    } catch (error) {
        console.error(error.message);
    }
})();
