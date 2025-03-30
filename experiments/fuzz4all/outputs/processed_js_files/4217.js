class Matrix {
    constructor(rows, cols, elements = []) {
        this.rows = rows;
        this.cols = cols;
        this.elements = elements.length ? elements : Array(rows).fill().map(() => Array(cols).fill(0));
    }

    static fromString(str) {
        const rows = str.trim().split('\n').map(row => row.trim().split(' ').map(Number));
        return new Matrix(rows.length, rows[0].length, rows);
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        return {
            next: () => {
                if (row >= this.rows) return { done: true };
                let value = this.elements[row][col];
                col++;
                if (col >= this.cols) {
                    col = 0;
                    row++;
                }
                return { value, done: false };
            }
        };
    }

    map(func) {
        const newElements = this.elements.map((row, r) => row.map((elem, c) => func(elem, r, c)));
        return new Matrix(this.rows, this.cols, newElements);
    }

    async transposeAsync() {
        return new Promise(resolve => {
            setTimeout(() => {
                const transposed = new Matrix(this.cols, this.rows);
                for (let i = 0; i < this.rows; i++) {
                    for (let j = 0; j < this.cols; j++) {
                        transposed.elements[j][i] = this.elements[i][j];
                    }
                }
                resolve(transposed);
            }, 100);
        });
    }

    toString() {
        return this.elements.map(row => row.join(' ')).join('\n');
    }
}

(async () => {
    const input = `
        1 2 3
        4 5 6
        7 8 9
    `;
    const matrix = Matrix.fromString(input);
    print('Original Matrix:\n' + matrix);

    for (let elem of matrix) {
        print('Element:', elem);
    }

    const doubledMatrix = matrix.map(x => x * 2);
    print('Doubled Matrix:\n' + doubledMatrix);

    const transposedMatrix = await matrix.transposeAsync();
    print('Transposed Matrix:\n' + transposedMatrix);
})();
