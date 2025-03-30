class Fibonacci {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        while (this.limit--) {
            [prev, curr] = [curr, prev + curr];
            this.cache.set(this.limit, curr);
            yield curr;
        }
    }

    static async fetchAndProcess(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data.map((item) => item.value).reduce((acc, num) => acc + num, 0);
    }
}

const fibSequence = new Fibonacci(10);
print([...fibSequence]);

(async () => {
    try {
        const result = await Fibonacci.fetchAndProcess('https://api.example.com/data');
        print('Processed result:', result);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
})();
