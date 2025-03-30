class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static from(array) {
        let m = new Matrix(array.length, array[0].length);
        m.data = array;
        return m;
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    multiply(other) {
        if (!(other instanceof Matrix)) {
            return this.map(val => val * other);
        }
        if (this.data[0].length !== other.data.length) {
            throw new Error("Columns of A must match rows of B");
        }

        let result = new Matrix(this.data.length, other.data[0].length);
        return result.map((_, i, j) => {
            return this.data[i].reduce((sum, elm, k) => sum + (elm * other.data[k][j]), 0);
        });
    }

    static identity(size) {
        let result = new Matrix(size, size);
        return result.map((_, i, j) => (i === j ? 1 : 0));
    }

    toString() {
        return this.data.map(row => row.join("\t")).join("\n");
    }
}

 
let a = Matrix.from([[1, 2, 3], [4, 5, 6]]);
let b = Matrix.from([[7, 8], [9, 10], [11, 12]]);

let product = a.multiply(b);
print("Matrix A:");
print(a.toString());
print("\nMatrix B:");
print(b.toString());
print("\nProduct of A and B:");
print(product.toString());

 
let identity = Matrix.identity(3);
print("\nIdentity Matrix:");
print(identity.toString());
