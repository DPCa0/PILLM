class Matrix {
    constructor(rows, cols, fillFunction) {
        this.data = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: cols }, (_, j) => fillFunction(i, j))
        );
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error("Columns of A must match rows of B");
        }
        return new Matrix(a.data.length, b.data[0].length, (i, j) =>
            a.data[i].reduce((sum, _, n) => sum + a.data[i][n] * b.data[n][j], 0)
        );
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        return {
            next: () => {
                if (row >= this.data.length) return { done: true };
                const value = this.data[row][col];
                col++;
                if (col >= this.data[row].length) {
                    col = 0;
                    row++;
                }
                return { value, done: false };
            }
        };
    }
}

const randomInt = (max) => Math.floor(Math.random() * max);

const a = new Matrix(3, 2, () => randomInt(10));
const b = new Matrix(2, 3, () => randomInt(10));
const c = Matrix.multiply(a, b);

print('Matrix A:', a.data);
print('Matrix B:', b.data);
print('Matrix C (A x B):', c.data);

print('Flattened Matrix C: ', [...c]);
