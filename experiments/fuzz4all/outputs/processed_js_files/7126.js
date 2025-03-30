class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromArray(array) {
        return new Matrix(array);
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield* row;
        }
    }

    map(callback) {
        return new Matrix(this.data.map((row, i) => row.map((value, j) => callback(value, i, j))));
    }

    static async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return Matrix.fromArray(data);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function transformMatrix(url, callback, delayMs) {
    let matrix = await Matrix.fetchData(url);
    matrix = matrix.map(callback);
    await delay(delayMs);
    print([...matrix]);
}

const dataUrl = 'https://api.example.com/matrixData';
const multiplyByTwo = value => value * 2;
transformMatrix(dataUrl, multiplyByTwo, 2000);
