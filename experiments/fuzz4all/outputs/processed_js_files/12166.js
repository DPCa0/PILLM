class Matrix {
    #data;  

    constructor(rows, cols, fill = 0) {
        this.#data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(array) {
        const m = new Matrix(array.length, array[0].length);
        m.#data = array.map(row => [...row]);
        return m;
    }

    map(fn) {
        this.#data = this.#data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(other) {
        if (this.cols !== other.rows) throw new Error("Incompatible matrices");
        return new Matrix(this.rows, other.cols).map((_, i, j) => 
            this.#data[i].reduce((sum, _, k) => sum + this.#data[i][k] * other.#data[k][j], 0)
        );
    }

    get rows() {
        return this.#data.length;
    }

    get cols() {
        return this.#data[0].length;
    }

    toString() {
        return this.#data.map(row => row.join(' ')).join('\n');
    }
}

const randomMatrix = (rows, cols) => new Matrix(rows, cols).map(() => Math.floor(Math.random() * 10));

const matrixA = randomMatrix(3, 2);
const matrixB = randomMatrix(2, 3);

print('Matrix A:');
print(matrixA.toString());

print('Matrix B:');
print(matrixB.toString());

const matrixC = matrixA.multiply(matrixB);

print('Matrix C (A * B):');
print(matrixC.toString());
