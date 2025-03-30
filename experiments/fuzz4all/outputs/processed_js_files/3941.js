class Matrix {
    constructor(data) {
        this.data = data;
    }

    static fromArray(arr) {
        return new Matrix(arr.map(row => row.slice()));
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            for (let value of row) {
                yield value;
            }
        }
    }

    add(matrix) {
        if (!(matrix instanceof Matrix)) throw new TypeError('Argument must be a Matrix');
        let result = this.data.map((row, i) => row.map((val, j) => val + matrix.data[i][j]));
        return Matrix.fromArray(result);
    }

    static async initIdentity(size) {
        let identityMatrix = Array.from({ length: size }, (_, i) => 
            Array.from({ length: size }, (_, j) => i === j ? 1 : 0)
        );
         
        await new Promise(resolve => setTimeout(resolve, 100));
        return new Matrix(identityMatrix);
    }
}

(async () => {
    try {
        let m1 = Matrix.fromArray([[1, 2], [3, 4]]);
        let m2 = await Matrix.initIdentity(2);
        let m3 = m1.add(m2);
        
        print("Resulting Matrix:");
        for (let value of m3) {
            print(value);
        }
    } catch (e) {
        console.error(e);
    }
})();
