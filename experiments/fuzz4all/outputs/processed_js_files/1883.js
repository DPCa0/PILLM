class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(size, callback) {
        return new Matrix(
            Array.from({ length: size }, (_, i) =>
                Array.from({ length: size }, (_, j) => callback(i, j))
            )
        );
    }

    *[Symbol.iterator]() {
        for (const row of this.data) {
            yield* row;
        }
    }

    map(callback) {
        return new Matrix(
            this.data.map((row, i) =>
                row.map((value, j) => callback(value, i, j))
            )
        );
    }

    static identity(size) {
        return Matrix.from(size, (i, j) => (i === j ? 1 : 0));
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error("Incompatible matrices");
        }

        return Matrix.from(a.data.length, (i, j) =>
            a.data[i].reduce(
                (sum, elem, k) => sum + elem * b.data[k][j],
                0
            )
        );
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

 
const size = 3;
const a = Matrix.from(size, (i, j) => i + j + 1);
const b = Matrix.identity(size);

const product = Matrix.multiply(a, b);

print("Matrix A:");
print(a.toString());
print("\nIdentity Matrix:");
print(b.toString());
print("\nProduct of A and Identity Matrix:");
print(product.toString());
