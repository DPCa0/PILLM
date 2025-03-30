class Matrix {
    constructor(rows, cols, fillFunction = () => Math.random()) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, fillFunction)
        );
    }

    static add(a, b) {
        return new Matrix(a.data.length, a.data[0].length, (i, j) => a.data[i][j] + b.data[i][j]);
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error("Incompatible matrices");
        return new Matrix(a.data.length, b.data[0].length, (i, j) =>
            a.data[i].reduce((sum, _, k) => sum + a.data[i][k] * b.data[k][j], 0)
        );
    }

    print() {
        console.table(this.data);
    }
}

 
function measureTime(target, name, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.time(name);
        const result = originalMethod.apply(this, args);
        console.timeEnd(name);
        return result;
    };
    return descriptor;
}

class MatrixOperations {
    @measureTime
    static heavyComputation(matrices) {
        return matrices.reduce(Matrix.multiply);
    }
}

 
const m1 = new Matrix(3, 3);
const m2 = new Matrix(3, 3);
const m3 = new Matrix(3, 3);

print("Matrix 1:");
m1.print();

print("Matrix 2:");
m2.print();

print("Matrix 3:");
m3.print();

const sum = Matrix.add(m1, m2);
print("Sum of Matrix 1 and 2:");
sum.print();

const result = MatrixOperations.heavyComputation([m1, m2, m3]);
print("Product of Matrix 1, 2 and 3:");
result.print();
