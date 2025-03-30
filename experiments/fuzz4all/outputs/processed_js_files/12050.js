class Matrix {
    constructor(data) {
        this.data = data;
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error('Matrices cannot be multiplied');
        }
        let result = Array.from({ length: a.data.length }, () =>
            new Array(b.data[0].length).fill(0)
        );
        return new Matrix(result.map((row, i) =>
            row.map((_, j) =>
                a.data[i].reduce((sum, el, k) => sum + el * b.data[k][j], 0)
            )
        ));
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        return {
            next: () => {
                if (row < this.data.length) {
                    let result = { value: this.data[row][col], done: false };
                    col++;
                    if (col >= this.data[row].length) {
                        col = 0;
                        row++;
                    }
                    return result;
                }
                return { done: true };
            }
        };
    }

    static fromFunction(fn, rows, cols) {
        let data = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: cols }, (_, j) => fn(i, j))
        );
        return new Matrix(data);
    }

    log() {
        print(this.data.map(row => row.join('\t')).join('\n'));
    }
}

 
const a = new Matrix([[1, 2, 3], [4, 5, 6]]);
const b = new Matrix([[7, 8], [9, 10], [11, 12]]);
const result = Matrix.multiply(a, b);
result.log();

const identityMatrix = Matrix.fromFunction((i, j) => i === j ? 1 : 0, 3, 3);
identityMatrix.log();

for (let value of identityMatrix) {
    print(value);
}
