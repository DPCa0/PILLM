class Matrix {
    constructor(rows, cols, fillFunction) {
        this.data = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: cols }, (_, j) => fillFunction(i, j))
        );
    }

    static fromArray(arr) {
        let rows = arr.length;
        let cols = arr[0].length;
        return new Matrix(rows, cols, (i, j) => arr[i][j]);
    }

    [Symbol.iterator]() {
        let data = this.data.flat();
        let index = -1;
        return {
            next: () => ({ value: data[++index], done: !(index in data) })
        };
    }

    map(callback) {
        return new Matrix(this.data.length, this.data[0].length, (i, j) => callback(this.data[i][j], i, j));
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}

const identity = n => new Matrix(n, n, (i, j) => (i === j ? 1 : 0));
const m = identity(3);

print('Identity Matrix (3x3):\n' + m);
print('\nSquared Matrix:');
const squaredMatrix = m.map(value => value ** 2);
print(squaredMatrix.toString());

print('\nFlattened Matrix Values:');
for (let value of squaredMatrix) {
    print(value);
}

const asyncSquare = async n => n ** 2;

(async () => {
    const results = await Promise.all([...squaredMatrix].map(async n => await asyncSquare(n)));
    print('\nAsync Squared Values:');
    print(results);
})();
