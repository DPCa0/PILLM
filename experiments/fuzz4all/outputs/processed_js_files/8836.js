class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromString(str) {
        return new Matrix(str.split('\n').map(row => row.split(' ').map(Number)));
    }

    transpose() {
        return new Matrix(this.data[0].map((_, i) => this.data.map(row => row[i])));
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield* row;
        }
    }

    async forEachAsync(callback) {
        for (let value of this) {
            await new Promise(resolve => setTimeout(resolve, 100));
            callback(value);
        }
    }

    static async asyncSum(matrix) {
        let sum = 0;
        await matrix.forEachAsync(value => sum += value);
        return sum;
    }

    static async multiply(a, b) {
        if (a.data[0].length !== b.data.length) throw new Error('Incompatible matrices');
        
        let transposedB = b.transpose();
        let result = a.data.map(row => transposedB.data.map(col => row.reduce((sum, elem, i) => sum + elem * col[i], 0)));
        
        return new Matrix(result);
    }
}

(async () => {
    const matrixStr = `1 2 3
                       4 5 6
                       7 8 9`;
    
    const matrix = Matrix.fromString(matrixStr);
    const transposed = matrix.transpose();
    
    print('Original Matrix:');
    print(matrix.data);

    print('Transposed Matrix:');
    print(transposed.data);

    const sum = await Matrix.asyncSum(matrix);
    print('Sum of Matrix Elements:', sum);

    const multiplied = await Matrix.multiply(matrix, transposed);
    print('Matrix Multiplied with Transposed:');
    print(multiplied.data);
})();
