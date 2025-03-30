class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static identity(size) {
        return new Matrix(size, size, 1).map((v, i, j) => (i === j ? 1 : 0));
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(b) {
        if (this.cols !== b.rows) throw new Error('Columns of A must match rows of B');
        const result = new Matrix(this.rows, b.cols);
        return result.map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < this.cols; k++) {
                sum += this.data[i][k] * b.data[k][j];
            }
            return sum;
        });
    }

    [Symbol.iterator]() {
        let i = 0, j = 0;
        return {
            next: () => {
                if (i < this.rows) {
                    const value = this.data[i][j];
                    if (j < this.cols - 1) {
                        j++;
                    } else {
                        i++;
                        j = 0;
                    }
                    return { value, done: false };
                }
                return { done: true };
            }
        };
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

 
const a = new Matrix(3, 3).map(() => Math.floor(Math.random() * 10));
const b = new Matrix(3, 3).map(() => Math.floor(Math.random() * 10));
const identity = Matrix.identity(3);

print('Matrix A:');
print(a.toString());

print('Matrix B:');
print(b.toString());

print('Identity Matrix:');
print(identity.toString());

const c = a.multiply(b);

print('Matrix A * B:');
print(c.toString());

 
for (const value of c) {
    print(value);
}
