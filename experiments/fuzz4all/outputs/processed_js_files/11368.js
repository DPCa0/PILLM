class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () => Array(cols).fill(defaultValue));
    }

    static identity(size) {
        return new Matrix(size, size).map((_, row, col) => (row === col ? 1 : 0));
    }

    map(fn) {
        return this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
    }

    add(matrix) {
        return this.map((val, i, j) => val + matrix.data[i][j]);
    }

    multiply(matrix) {
        if (this.data[0].length !== matrix.data.length) throw new Error("Matrices cannot be multiplied");
        let result = new Matrix(this.data.length, matrix.data[0].length);
        return result.map((_, i, j) => 
            this.data[i].reduce((sum, elem, k) => sum + elem * matrix.data[k][j], 0)
        );
    }
}

function* fibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    print("Fibonacci sequence:");
    for (let value of fibonacci(10)) {
        print(value);
        await delay(500);
    }
    
    print("Matrix operations:");
    let a = new Matrix(2, 2).map(() => Math.floor(Math.random() * 10));
    let b = new Matrix(2, 2).map(() => Math.floor(Math.random() * 10));

    print("Matrix A:");
    console.table(a.data);

    print("Matrix B:");
    console.table(b.data);

    try {
        let sum = a.add(b);
        print("A + B:");
        console.table(sum.data);
        
        let product = a.multiply(b);
        print("A * B:");
        console.table(product.data);
    } catch (error) {
        console.error(error.message);
    }
})();
