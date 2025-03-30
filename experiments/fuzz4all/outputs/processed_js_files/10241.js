class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(nestedArray) {
        return new Matrix(nestedArray);
    }

    get rows() {
        return this.data.length;
    }

    get columns() {
        return this.data[0].length;
    }

    [Symbol.iterator]() {
        let row = 0;
        let col = 0;
        return {
            next: () => {
                if (row < this.rows) {
                    if (col < this.columns) {
                        return { value: this.data[row][col++], done: false };
                    } else {
                        col = 0;
                        row++;
                        return this.next();
                    }
                }
                return { done: true };
            }
        };
    }

    *transpose() {
        for (let col = 0; col < this.columns; col++) {
            yield Array.from({ length: this.rows }, (_, row) => this.data[row][col]);
        }
    }

    async mapAsync(callback) {
        const promises = this.data.map((row, i) =>
            Promise.all(row.map((value, j) => callback(value, i, j)))
        );
        this.data = await Promise.all(promises);
        return this;
    }
}

(async () => {
    const matrix = Matrix.from([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);

    print("Original Matrix:");
    print(matrix.data);

    print("Iterating over matrix:");
    for (const value of matrix) {
        print(value);
    }

    print("Transposed Matrix:");
    for (const row of matrix.transpose()) {
        print(row);
    }

    print("Matrix after async map:");
    await matrix.mapAsync(async (value) => {
        return new Promise(resolve => setTimeout(() => resolve(value * 2), 100));
    });
    print(matrix.data);
})();
