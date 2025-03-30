class Matrix {
    constructor(data) {
        this.data = data;
    }
    
    static fromArray(arr) {
        return new Matrix(arr.map(row => row.slice()));
    }
    
    multiply(other) {
        const result = new Array(this.data.length)
            .fill(null)
            .map(() => new Array(other.data[0].length).fill(0));
        
        for (let i = 0; i < this.data.length; i++) {
            for (let j = 0; j < other.data[0].length; j++) {
                for (let k = 0; k < this.data[0].length; k++) {
                    result[i][j] += this.data[i][k] * other.data[k][j];
                }
            }
        }
        return new Matrix(result);
    }

    map(fn) {
        return new Matrix(this.data.map((row, i) => row.map((value, j) => fn(value, i, j))));
    }
    
    toString() {
        return this.data.map(row => row.join('\t')).join('\n');
    }
}

const asyncMatrixMultiplier = async (mat1, mat2) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(mat1.multiply(mat2)), 1000);
    });
};

(async () => {
    const mat1 = Matrix.fromArray([[1, 2, 3], [4, 5, 6]]);
    const mat2 = Matrix.fromArray([[7, 8], [9, 10], [11, 12]]);
    
    print('Matrix 1:');
    print(mat1.toString());
    
    print('Matrix 2:');
    print(mat2.toString());
    
    const result = await asyncMatrixMultiplier(mat1, mat2);
    print('Result:');
    print(result.toString());
    
    print('After applying sigmoid function:');
    print(result.map(value => 1 / (1 + Math.exp(-value))).toString());
})();
