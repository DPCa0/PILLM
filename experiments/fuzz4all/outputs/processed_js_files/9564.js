class Fibonacci {
    constructor() {
        this.memo = new Map();
    }

    calculate(n) {
        if (n <= 1) return n;
        if (this.memo.has(n)) return this.memo.get(n);
        const result = this.calculate(n - 1) + this.calculate(n - 2);
        this.memo.set(n, result);
        return result;
    }

    *[Symbol.iterator]() {
        let i = 0;
        while (true) {
            yield this.calculate(i++);
        }
    }
}

const fibGen = (function* (fibIter) {
    for (let num of fibIter) {
        yield num;
    }
})(new Fibonacci());

const firstTenFib = [...Array(10)].map(() => fibGen.next().value);

print(firstTenFib);

(async function fetchDataAndLog() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data.slice(0, 5));
    } catch (error) {
        console.error('Fetch error:', error);
    }
})();
