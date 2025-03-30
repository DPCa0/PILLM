class Matrix {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(0));
    }

    static fromArray(arr) {
        let matrix = new Matrix(arr.length, 1);
        matrix.map((_, i) => arr[i]);
        return matrix;
    }

    static map(A, func) {
        let result = new Matrix(A.rows, A.cols);
        result.data = A.data.map((row, i) => row.map((val, j) => func(val, i, j)));
        return result;
    }

    map(func) {
        this.data = this.data.map((row, i) => row.map((val, j) => func(val, i, j)));
        return this;
    }

    add(other) {
        return Matrix.map(this, (val, i, j) => val + other.data[i][j]);
    }

    multiply(other) {
        if (other instanceof Matrix) {
            return Matrix.map(this, (val, i, j) => val * other.data[i][j]);
        } else {
            return this.map(val => val * other);
        }
    }

    static multiply(A, B) {
        if (A.cols !== B.rows) throw new Error("Columns of A must match rows of B");
        let result = new Matrix(A.rows, B.cols);
        result.map((_, i, j) => {
            let sum = 0;
            for (let k = 0; k < A.cols; k++) {
                sum += A.data[i][k] * B.data[k][j];
            }
            return sum;
        });
        return result;
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
}

const delayedExecution = async (ms) => new Promise(res => setTimeout(res, ms));

(async () => {
    print("Fetching data...");
    try {
        const data = await fetchData('https://api.example.com/data');
        print('Data fetched:', data);

        const matrixA = Matrix.fromArray([1, 2, 3]);
        const matrixB = Matrix.fromArray([4, 5, 6]);

        print('Matrix A:', matrixA);
        console.log('Matrix