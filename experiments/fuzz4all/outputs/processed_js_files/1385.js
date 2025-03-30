class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(arr) {
        return new Matrix(arr);
    }

    [Symbol.iterator]() {
        let row = 0, col = 0;
        const { data } = this;
        return {
            next() {
                if (row < data.length && col < data[row].length) {
                    return { value: data[row][col++], done: false };
                } else if (row < data.length - 1) {
                    col = 0;
                    return { value: data[++row][col++], done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }

    map(fn) {
        return new Matrix(this.data.map(row => row.map(fn)));
    }

    async sumAsync() {
        return this.data.flat().reduce(async (acc, val) => (await acc) + val, Promise.resolve(0));
    }

    static async fromFetch(url) {
        const response = await fetch(url);
        const json = await response.json();
        return Matrix.from(json.data);
    }
}

(async () => {
    try {
        const matrix = Matrix.from([
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ]);

        for (let value of matrix) {
            print(`Iterating value: ${value}`);
        }

        const squaredMatrix = matrix.map(x => x * x);
        print('Squared Matrix:', squaredMatrix.data);

        const sum = await matrix.sumAsync();
        print('Sum of Matrix:', sum);

         
         
         
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
