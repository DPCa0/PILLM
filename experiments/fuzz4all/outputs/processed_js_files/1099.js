class Matrix {
    constructor(data) {
        this.data = data;
    }

    static async fetchData(url) {
        const response = await fetch(url);
        return response.json();
    }

    *transpose() {
        for (let i = 0; i < this.data[0].length; i++) {
            yield this.data.map(row => row[i]);
        }
    }

    async *asyncMap(operation) {
        for (let row of this.data) {
            yield await Promise.all(row.map(operation));
        }
    }
}

(async () => {
    try {
        const matrix = new Matrix([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);

        print("Original Matrix:");
        console.table(matrix.data);

        print("Transposed Matrix:");
        const transposed = [...matrix.transpose()];
        console.table(transposed);

        const asyncOperation = async (num) => {
            return new Promise(resolve => setTimeout(() => resolve(num * 2), 500));
        };

        print("Matrix after async operation:");
        const asyncMapped = [];
        for await (let row of matrix.asyncMap(asyncOperation)) {
            asyncMapped.push(row);
        }
        console.table(asyncMapped);

        const url = "https://api.example.com/matrix-data";   
        const externalData = await Matrix.fetchData(url);
        const externalMatrix = new Matrix(externalData);
        print("External Matrix:");
        console.table(externalMatrix.data);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
