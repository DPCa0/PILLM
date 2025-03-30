class Fibonacci {
    constructor(limit) {
        this.limit = limit;
    }

    *generate() {
        let a = 0, b = 1;
        while (a <= this.limit) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    async print() {
        const sequence = [];
        for (const num of this.generate()) {
            sequence.push(num);
        }
        print('Fibonacci sequence:', sequence.join(', '));
    }
}

const fibonacci = new Fibonacci(100);

(async () => {
    const delayedResult = await new Promise(resolve => setTimeout(() => {
        fibonacci.print();
        resolve('Completed');
    }, 1000));
    print(delayedResult);
})();
