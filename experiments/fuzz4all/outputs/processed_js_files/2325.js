class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(dimensions, initializer = () => Math.random()) {
        return new Matrix(Array.from({ length: dimensions[0] }, () =>
            Array.from({ length: dimensions[1] }, initializer)
        ));
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield row;
        }
    }

    map(fn) {
        return new Matrix(this.data.map(row => row.map(fn)));
    }

    static async parallelTransform(matrix, transformFn) {
        const transformed = matrix.data.map(row =>
            Promise.all(row.map(async cell => await transformFn(cell)))
        );
        const resolvedData = await Promise.all(transformed);
        return new Matrix(resolvedData);
    }
}

(async () => {
    const matrix = Matrix.from([5, 5], () => Math.floor(Math.random() * 10));
    print("Original Matrix:");
    for (let row of matrix) {
        print(row);
    }

    const transformedMatrix = matrix.map(x => x * 2);
    print("\nTransformed Matrix (x * 2):");
    for (let row of transformedMatrix) {
        print(row);
    }

    const parallelTransformedMatrix = await Matrix.parallelTransform(matrix, async x => x + 1);
    print("\nParallel Transformed Matrix (+1):");
    for (let row of parallelTransformedMatrix) {
        print(row);
    }
})();
