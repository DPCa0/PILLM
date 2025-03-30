class Matrix {
    #matrix;
    
    constructor(rows, cols, fillValue = 0) {
        this.#matrix = Array.from({ length: rows }, () => Array(cols).fill(fillValue));
    }
    
    static fromArray(array) {
        const rows = array.length;
        const cols = array[0].length;
        const mat = new Matrix(rows, cols);
        mat.#matrix = array.map(row => [...row]);
        return mat;
    }
    
    map(callback) {
        return Matrix.fromArray(this.#matrix.map((row, i) => row.map((val, j) => callback(val, i, j))));
    }
    
    add(other) {
        return this.map((val, i, j) => val + other.#matrix[i][j]);
    }
    
    multiply(other) {
        const result = new Matrix(this.#matrix.length, other.#matrix[0].length);
        return result.map((_, i, j) => 
            this.#matrix[i].reduce((sum, elm, k) => sum + (elm * other.#matrix[k][j]), 0)
        );
    }
    
    logMatrix() {
        print(this.#matrix.map(row => row.join(' ')).join('\n'));
    }
}

(async () => {
    const matA = Matrix.fromArray([
        [1, 2, 3],
        [4, 5, 6]
    ]);
    
    const matB = Matrix.fromArray([
        [7, 8],
        [9, 10],
        [11, 12]
    ]);
    
    print('Matrix A:');
    matA.logMatrix();
    
    print('\nMatrix B:');
    matB.logMatrix();
    
    const matC = matA.multiply(matB);
    
    print('\nMatrix A multiplied by Matrix B:');
    matC.logMatrix();
    
    const doubledMatC = await new Promise(resolve => 
        setTimeout(() => resolve(matC.map(val => val * 2)), 1000)
    );
    
    print('\nDoubled Matrix C:');
    doubledMatC.logMatrix();
})();
