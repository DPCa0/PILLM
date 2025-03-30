class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }
    
    static fromArray(array) {
        let m = new Matrix(array.length, array[0].length);
        m.data = array.map(row => [...row]);
        return m;
    }
    
    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }
    
    static map(m, fn) {
        let result = new Matrix(m.data.length, m.data[0].length);
        result.data = m.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return result;
    }
    
    add(n) {
        return n instanceof Matrix ?
            this.map((val, i, j) => val + n.data[i][j]) :
            this.map(val => val + n);
    }
    
    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error("Columns of A must match rows of B.");
        }
        let result = new Matrix(a.data.length, b.data[0].length);
        result.map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < a.data[0].length; k++) {
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        });
        return result;
    }
}

(async function main() {
    try {
        let a = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
        let b = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);
        
        print('Matrix A:');
        console.table(a.data);

        print('Matrix B:');
        console.table(b.data);

        let c = Matrix.multiply(a, b);
        print('Matrix A * B:');
        console.table(c.data);

         
        let promise = new Promise((resolve) => setTimeout(() => resolve("Done"), 1000));
        let message = await promise;
        print(`Async Result: ${message}`);