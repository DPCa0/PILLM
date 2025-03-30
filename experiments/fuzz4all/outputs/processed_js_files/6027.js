class Matrix {
    constructor(data) {
        this.data = data;
    }

    static create(rows, cols, val = 0) {
        return new Matrix(Array.from({ length: rows }, () => Array(cols).fill(val)));
    }

    static identity(size) {
        return new Matrix(Array.from({ length: size }, (v, i) =>
            Array.from({ length: size }, (v, j) => (i === j ? 1 : 0))
        ));
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) {
            throw new Error("Incompatible matrix sizes for multiplication");
        }
        return new Matrix(this.data.map((row, i) =>
            other.data[0].map((_, j) =>
                row.reduce((sum, val, k) => sum + val * other.data[k][j], 0)
            )
        ));
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}

 
const m1 = Matrix.create(2, 2, 3);
const m2 = Matrix.identity(2);
const result = m1.multiply(m2);

print('Matrix 1:');
print(m1.toString());
print('\nMatrix 2 (Identity):');
print(m2.toString());
print('\nResult of Multiplication:');
print(result.toString());
