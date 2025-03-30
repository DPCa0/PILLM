class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(size, fn) {
        const data = Array.from({ length: size }, (_, i) => 
            Array.from({ length: size }, (_, j) => fn(i, j))
        );
        return new Matrix(data);
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) {
            throw new Error('Incompatible matrices');
        }
        const size = this.data.length;
        return Matrix.from(size, (i, j) => 
            this.data[i].reduce((sum, val, k) => sum + val * other.data[k][j], 0)
        );
    }

    [Symbol.iterator]() {
        let index = 0;
        const flatData = this.data.flat();
        return {
            next: () => ({
                value: flatData[index],
                done: index++ >= flatData.length
            })
        };
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

function complexMatrixOperation(size, transformFn, outputFn) {
    const identity = Matrix.from(size, (i, j) => i === j ? 1 : 0);
    const randomMatrix = Matrix.from(size, () => Math.floor(Math.random() * 10));

    const transformed = randomMatrix.map(transformFn);
    const result = transformed.multiply(identity);

    outputFn(result);
}

complexMatrixOperation(3, (val, i, j) => val + i * j, (matrix) => {
    print('Resulting Matrix:');
    print(matrix.toString());
    print('Flattened Values:');
    for (const value of matrix) {
        print(value);
    }
});
