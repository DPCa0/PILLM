class Matrix {
    constructor(data) {
        this.data = data;
    }

    static from(dim, fill = 0) {
        return new Matrix(Array.from({ length: dim }, () => Array(dim).fill(fill)));
    }

    get dimension() {
        return this.data.length;
    }

    *[Symbol.iterator]() {
        for (let row of this.data) {
            yield* row;
        }
    }

    transpose() {
        this.data = this.data[0].map((_, i) => this.data.map(row => row[i]));
        return this;
    }

    multiply(mat) {
        if (this.dimension !== mat.dimension) throw new Error("Dimension mismatch");
        let result = Matrix.from(this.dimension);

        result.data = result.data.map((row, i) =>
            row.map((_, j) =>
                this.data[i].reduce((sum, elm, k) => sum + elm * mat.data[k][j], 0)
            )
        );

        return result;
    }
}

(async () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    let matA = Matrix.from(3).transpose();
    let matB = Matrix.from(3, 2);

    print("Matrix A:", ...matA);
    print("Matrix B:", ...matB);

    await delay(1000);

    try {
        let result = matA.multiply(matB);
        print("Result:", ...result);
    } catch (e) {
        console.error("Error:", e.message);
    }
})();
