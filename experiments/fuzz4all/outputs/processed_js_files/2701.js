class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromArray(arr) {
        const size = Math.sqrt(arr.length);
        if (!Number.isInteger(size)) throw new Error("Array length must be a perfect square.");
        return new Matrix([...Array(size)].map((_, i) => arr.slice(i * size, (i + 1) * size)));
    }

    get [Symbol.toStringTag]() {
        return 'Matrix';
    }

    *[Symbol.iterator]() {
        for (let row of this.data) yield* row;
    }

    map(fn) {
        return new Matrix(this.data.map(row => row.map(fn)));
    }

    async mapAsync(fn) {
        const result = await Promise.all(this.data.map(async row => await Promise.all(row.map(fn))));
        return new Matrix(result);
    }

    toString() {
        return this.data.map(row => row.join(' ')).join('\n');
    }
}

 
(async () => {
    const m = Matrix.fromArray([1, 2, 3, 4]);
    print(m.toString());

    const incremented = m.map(x => x + 1);
    print('\nIncremented Matrix:');
    print(incremented.toString());

    const squaredAsync = await m.mapAsync(async x => x * x);
    print('\nSquared Matrix (Async):');
    print(squaredAsync.toString());
})();
