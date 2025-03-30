class Matrix {
    constructor(rows, cols, defaultValue = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => defaultValue)
        );
    }

    static fromArray(array) {
        const rows = array.length;
        const cols = array[0].length;
        const matrix = new Matrix(rows, cols);
        matrix.data = array;
        return matrix;
    }

    toArray() {
        return this.data;
    }

    map(fn) {
        this.data = this.data.map((row, i) =>
            row.map((val, j) => fn(val, i, j))
        );
        return this;
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) {
            throw new Error("Columns of A must match rows of B");
        }
        let result = new Matrix(a.data.length, b.data[0].length);
        return result.map((_, i, j) =>
            a.data[i].reduce((sum, elem, k) => sum + elem * b.data[k][j], 0)
        );
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
}

const dataURL = "https://jsonplaceholder.typicode.com/posts";
fetchData(dataURL)
    .then(data => {
        const matrixData = data.slice(0, 2).map(item => [item.id, item.userId]);
        const matrix = Matrix.fromArray(matrixData);
        print("Original Matrix:", matrix.toArray());

        const transformedMatrix = matrix.map(x => x * 2);
        print("Transformed Matrix:", transformedMatrix.toArray());

        const a = Matrix.fromArray([
            [1, 2, 3],
            [4, 5, 6]
        ]);
        const b = Matrix.fromArray([
            [7, 8],
            [9, 10],
            [11, 12]
        ]);
        const product = Matrix.multiply(a, b);
        print("Product of A and B:", product.toArray());
    })
    .catch(error => console.error('Error:', error));
