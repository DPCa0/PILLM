 
class Matrix {
    #elements;

    constructor(data) {
        this.#elements = data;
    }

     
    #validateMatrix(matrix) {
        return matrix.every(row => row.length === matrix[0].length);
    }

    static #multiplyVectors(vectorA, vectorB) {
        return vectorA.map((val, index) => val * vectorB[index]).reduce((sum, val) => sum + val, 0);
    }

    multiply(other) {
        if (!this.#validateMatrix(other.#elements)) {
            throw new Error("Invalid matrix dimensions for multiplication.");
        }

        const result = this.#elements.map((row, rowIndex) =>
            other.#elements[0].map((_, colIndex) =>
                Matrix.#multiplyVectors(row, other.#elements.map(row => row[colIndex]))
            )
        );

        return new Matrix(result);
    }

    toString() {
        return this.#elements.map(row => row.join(' ')).join('\n');
    }
}

 
async function* asyncDataStreamer(data) {
    for (const item of data) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield item;
    }
}

(async () => {
    const matrixA = new Matrix([[1, 2, 3], [4, 5, 6]]);
    const matrixB = new Matrix([[7, 8], [9, 10], [11, 12]]);
    
    const resultMatrix = matrixA.multiply(matrixB);
    print('Matrix A * Matrix B:\n', resultMatrix.toString());

     
    print('\nStreaming data asynchronously:');
    const dataStreamer = asyncDataStreamer(['Item1', 'Item2', 'Item3']);
    for await (const item of dataStreamer) {
        print('Received:', item);
    }
})();
