class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }
    
    static fromArray(arr) {
        return new Matrix(arr.length, arr[0].length, 0).map((_, i, j) => arr[i][j]);
    }
    
    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }
    
    static multiply(a, b) {
        if (a.cols !== b.rows) throw new Error("Columns of A must match rows of B");
        return new Matrix(a.rows, b.cols).map((_, i, j) => {
            return a.data[i].reduce((sum, elm, k) => sum + elm * b.data[k][j], 0);
        });
    }

    static random(rows, cols, min = 0, max = 1) {
        return new Matrix(rows, cols).map(() => Math.random() * (max - min) + min);
    }

    print() {
        console.table(this.data);
        return this;
    }
}

 
const a = Matrix.random(2, 3, 0, 5);
const b = Matrix.random(3, 2, 0, 5);
const c = Matrix.multiply(a, b);

print("Matrix A:");
a.print();

print("Matrix B:");
b.print();

print("Result of A x B:");
c.print();
