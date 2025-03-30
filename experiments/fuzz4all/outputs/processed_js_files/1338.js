class Matrix {
    constructor(rows, cols, fill = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array.from({ length: rows }, () => Array(cols).fill(fill));
    }

    static random(rows, cols, min = 0, max = 1) {
        return new Matrix(rows, cols).map(() => Math.random() * (max - min) + min);
    }

    map(fn) {
        this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
        return this;
    }

    static multiply(m1, m2) {
        if (m1.cols !== m2.rows) throw new Error('Columns of A must match rows of B.');
        return new Matrix(m1.rows, m2.cols).map((_, i, j) => {
            return m1.data[i].reduce((sum, el, k) => sum + el * m2.data[k][j], 0);
        });
    }
}

const asyncFetch = async url => {
    let response = await fetch(url);
    let data = await response.json();
    return data;
};

(async () => {
    try {
        let jsonPlaceholder = await asyncFetch('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched Data:', jsonPlaceholder);

        let m1 = Matrix.random(3, 2);
        let m2 = Matrix.random(2, 3);
        print('Matrix 1:', m1.data);
        print('Matrix 2:', m2.data);

        let product = Matrix.multiply(m1, m2);
        print('Product:', product.data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
