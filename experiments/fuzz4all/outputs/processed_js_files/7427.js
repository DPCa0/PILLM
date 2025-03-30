class Matrix {
    constructor(rows, cols, fill = 0) {
        this.data = Array.from({ length: rows }, () =>
            Array.from({ length: cols }, () => fill)
        );
    }

    static fromArray(arr) {
        const matrix = new Matrix(arr.length, arr[0].length);
        matrix.map((_, i, j) => arr[i][j]);
        return matrix;
    }

    map(callback) {
        this.data = this.data.map((row, i) =>
            row.map((val, j) => callback(val, i, j, this.data))
        );
        return this;
    }

    multiply(other) {
        if (typeof other === 'number') {
            return this.map(val => val * other);
        } else if (other instanceof Matrix && this.data[0].length === other.data.length) {
            return this.map((_, i, j) => {
                return this.data[i].reduce((sum, _, k) => sum + this.data[i][k] * other.data[k][j], 0);
            });
        }
        throw new Error('Matrices are not compatible for multiplication');
    }

    toArray() {
        return this.data;
    }
}

const asyncAddMatrices = async (matrix1, matrix2) => {
    if (matrix1.data.length !== matrix2.data.length ||
        matrix1.data[0].length !== matrix2.data[0].length) {
        throw new Error('Matrices must have the same dimensions');
    }

    const result = new Matrix(matrix1.data.length, matrix1.data[0].length);
    return new Promise(resolve => {
        setTimeout(() => {
            result.map((_, i, j) => matrix1.data[i][j] + matrix2.data[i][j]);
            resolve(result);
        }, 1000);
    });
};

 
(async () => {
    const mat1 = Matrix.fromArray([[1, 2], [3, 4]]);
    const mat2 = Matrix.fromArray([[5, 6], [7, 8]]);

    print('Matrix 1:', mat1.toArray());
    print('Matrix 2:', mat2.toArray());

    const addedMatrices = await asyncAddMatrices(mat1, mat2);
    print('Added Matrices:', addedMatrices.toArray());

    const multipliedMatrix = mat1.multiply(mat2);
    console.log('Multiplied Matrix:', multipliedMatrix.toArray