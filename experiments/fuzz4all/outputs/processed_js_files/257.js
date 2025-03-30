class AsyncNumberGenerator {
    constructor(limit) {
        this.limit = limit;
        this.cache = new Map();
    }

    async generateNumber(index) {
        if (this.cache.has(index)) {
            return this.cache.get(index);
        }
        
        return new Promise((resolve) => {
            setTimeout(() => {
                const number = Math.floor(Math.random() * 100);
                this.cache.set(index, number);
                resolve(number);
            }, 1000);
        });
    }

    async *[Symbol.asyncIterator]() {
        for (let i = 0; i < this.limit; i++) {
            yield await this.generateNumber(i);
        }
    }
}

(async () => {
    const generator = new AsyncNumberGenerator(5);

    for await (let number of generator) {
        print(`Generated number: ${number}`);
    }
})();
