class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static identity(size) {
        let identityMatrix = new Matrix(size, size);
        identityMatrix.map((_, i, j) => (i === j ? 1 : 0));
        return identityMatrix;
    }

    static from(array) {
        let m = new Matrix(array.length, array[0].length);
        m.map((_, i, j) => array[i][j]);
        return m;
    }

    map(fn) {
        this.data = this.data.map((row, i) =>
            row.map((val, j) => fn(val, i, j))
        );
        return this;
    }

    print() {
        print(this.data);
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield* row;
        }
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncMatrixDemo() {
    let identity = Matrix.identity(3);
    let initialMatrix = Matrix.from([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ]);

    print('Initial Matrix:');
    initialMatrix.print();

    await delay(1000);

    let sum = 0;
    for (let val of initialMatrix) {
        sum += val;
    }
    print(`Sum of all elements: ${sum}`);

    await delay(1000);

    print('Identity Matrix:');
    identity.print();
}

asyncMatrixDemo();
