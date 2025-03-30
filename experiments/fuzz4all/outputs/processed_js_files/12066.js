(async function() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    class Matrix {
        constructor(rows, cols, fill = 0) {
            this.data = Array.from({ length: rows }, () => Array.from({ length: cols }, () => fill));
        }

        static from(array) {
            const matrix = new Matrix(array.length, array[0].length);
            matrix.data = array;
            return matrix;
        }

        static random(rows, cols, min = 0, max = 1) {
            const matrix = new Matrix(rows, cols);
            matrix.data = matrix.data.map(row => row.map(() => Math.random() * (max - min) + min));
            return matrix;
        }

        map(fn) {
            this.data = this.data.map((row, i) => row.map((val, j) => fn(val, i, j)));
            return this;
        }

        multiply(matrix) {
            if (this.data[0].length !== matrix.data.length) throw new Error('Incompatible matrices');
            const result = new Matrix(this.data.length, matrix.data[0].length);
            return result.map((_, i, j) =>
                this.data[i].reduce((sum, elm, k) => sum + elm * matrix.data[k][j], 0)
            );
        }

        async animate(duration = 1000) {
            console.clear();
            console.table(this.data);
            await delay(duration);
            return this;
        }
    }

    const main = async () => {
        const m1 = Matrix.random(3, 3);
        const m2 = Matrix.random(3, 3);

        await m1.animate();
        await m2.animate();

        const result = m1.multiply(m2);
        await result.animate();
    };

    await main();
})();
