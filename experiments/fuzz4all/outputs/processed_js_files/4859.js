class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static fromArray(array) {
        const matrix = new Matrix(array.length, array[0].length);
        matrix.data = array;
        return matrix;
    }

    multiply(other) {
        if (this.data[0].length !== other.data.length) throw 'Matrices dimensions mismatch';
        
        const result = new Matrix(this.data.length, other.data[0].length);
        this.data.forEach((row, i) => {
            other.data[0].forEach((_, j) => {
                result.data[i][j] = row.reduce((sum, el, k) => sum + el * other.data[k][j], 0);
            });
        });
        
        return result;
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

function* fibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessed property "${property}": ${target[property]}`);
            return target[property];
        }
        throw new ReferenceError(`Property "${property}" does not exist.`);
    }
};

const matrixA = Matrix.fromArray([
    [1, 2, 3],
    [4, 5, 6]
]);

const matrixB = Matrix.fromArray([
    [7, 8],
    [9, 10],
    [11, 12]
]);

const matrixC = matrixA.multiply(matrixB);

const proxyMatrix = new Proxy(matrixC, handler);
print(proxyMatrix.toString());

for (let num of fibonacci(10)) {
    print(num);
}
