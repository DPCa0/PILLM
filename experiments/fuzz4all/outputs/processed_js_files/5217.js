class Matrix {
    constructor(rows, cols, fillFunction = () => 0) {
        this.data = Array.from({ length: rows }, (_, i) =>
            Array.from({ length: cols }, (_, j) => fillFunction(i, j))
        );
    }

    static identity(size) {
        return new Matrix(size, size, (i, j) => (i === j ? 1 : 0));
    }

    multiply(other) {
        const result = new Matrix(this.data.length, other.data[0].length);
        this.data.forEach((row, i) => {
            other.data[0].forEach((_, j) => {
                result.data[i][j] = row.reduce((sum, elm, k) => sum + elm * other.data[k][j], 0);
            });
        });
        return result;
    }

    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

async function fetchAndProcess(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
    const data = await response.json();
    print('Fetched data:', data);
}

function* fibonacci(n) {
    let a = 0, b = 1;
    while (n--) {
        yield a;
        [a, b] = [b, a + b];
    }
}

(async function main() {
    print('Matrix Multiplication Example:');
    const A = new Matrix(3, 3, (i, j) => i + j);
    const B = Matrix.identity(3);
    print('Matrix A:\n', A.toString());
    print('Matrix B:\n', B.toString());
    const C = A.multiply(B);
    print('A x B:\n', C.toString());

    print('\nFibonacci Sequence:');
    print([...fibonacci(10)]);

    try {
        await fetchAndProcess('https://api.example.com/data');
    } catch (error) {
        console.error(error);
    }
})();
