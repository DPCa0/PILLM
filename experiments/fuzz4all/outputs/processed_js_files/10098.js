class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(array) {
        return new Matrix(array);
    }

    [Symbol.iterator]() {
        let row = 0;
        const data = this.data;
        return {
            next() {
                if (row < data.length) {
                    return { value: data[row++], done: false };
                }
                return { done: true };
            }
        };
    }

    map(fn) {
        return Matrix.from(this.data.map((row, rowIndex) => row.map((value, colIndex) => fn(value, rowIndex, colIndex))));
    }

    static async* asyncGenerator(matrix) {
        for (const row of matrix) {
            await new Promise(resolve => setTimeout(resolve, 100));  
            yield row;
        }
    }

    transpose() {
        return Matrix.from(this.data[0].map((_, colIndex) => this.data.map(row => row[colIndex])));
    }
}

const main = async () => {
    const matrix = Matrix.from([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
    ]);

    print('Original Matrix:');
    print(matrix.data);

    const transposed = matrix.transpose();
    print('Transposed Matrix:');
    print(transposed.data);

    print('Mapped Matrix:');
    const mapped = matrix.map((value, row, col) => value * 2);
    print(mapped.data);

    print('Async Iteration of Original Matrix:');
    for await (const row of Matrix.asyncGenerator(matrix)) {
        print(row);
    }
};

main().catch(console.error);
