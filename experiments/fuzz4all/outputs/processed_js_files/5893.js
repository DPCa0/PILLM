class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(dimensions, filler = () => 0) {
        return new Matrix(Array.from({ length: dimensions[0] }, () =>
            Array.from({ length: dimensions[1] }, filler)
        ));
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) => row.map((val, j) => fn(val, i, j))));
    }

    static multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error('Incompatible dimensions');
        return Matrix.from([a.data.length, b.data[0].length]).map(
            (_, i, j) => a.data[i].reduce((sum, _, k) => sum + a.data[i][k] * b.data[k][j], 0)
        );
    }
}

async function fetchData(url) {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
}

(async () => {
    try {
        const { data: dataA } = await fetchData('https://api.example.com/matrixA');
        const { data: dataB } = await fetchData('https://api.example.com/matrixB');

        const matrixA = new Matrix(dataA);
        const matrixB = new Matrix(dataB);

        const productMatrix = Matrix.multiply(matrixA, matrixB);

        print('Matrix A:', matrixA.data);
        print('Matrix B:', matrixB.data);
        print('Product:', productMatrix.data);
    } catch (error) {
        console.error('Error:', error);
    }
})();
