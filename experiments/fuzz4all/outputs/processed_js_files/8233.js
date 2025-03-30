class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(size, fn) {
        return new Matrix(Array.from({ length: size }, (_, i) => fn(i)));
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrix sizes');
        return new Matrix(a.data.map((row, i) =>
            b.data[0].map((_, j) =>
                row.reduce((sum, elt, k) => sum + elt * b.data[k][j], 0)
            )
        ));
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

const identity = Matrix.from(3, i => [0, 0, 0].map((_, j) => i === j ? 1 : 0));
const randomMatrix = Matrix.from(3, () => Array.from({ length: 3 }, () => Math.random().toFixed(2)));

print('Identity Matrix:\n' + identity);
print('\nRandom Matrix:\n' + randomMatrix);

const result = Matrix.multiply(identity, randomMatrix);
print('\nResult of Multiplication:\n' + result);
