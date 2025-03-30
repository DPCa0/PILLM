class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        return {
            next: () => {
                if (row >= this.rows) {
                    return { done: true };
                }
                const value = this.data[row][col];
                col++;
                if (col === this.cols) {
                    col = 0;
                    row++;
                }
                return { value, done: false };
            }
        };
    }

    async* transposeAsync() {
        for (let col = 0; col < this.cols; col++) {
            const newRow = [];
            for (let row = 0; row < this.rows; row++) {
                newRow.push(this.data[row][col]);
                await new Promise(resolve => setTimeout(resolve, 100));  
            }
            yield newRow;
        }
    }
}

(async () => {
    const matrix = new Matrix(3, 3, 1);
    matrix.data[0][2] = 5;
    matrix.data[1][1] = 3;
    matrix.data[2][0] = 8;

    for (const value of matrix) {
        print(value);
    }

    print('Transposed Matrix:');
    for await (const row of matrix.transposeAsync()) {
        print(row);
    }
})();
