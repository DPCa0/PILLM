class AsyncIterableRange {
    constructor(start, end) {
        this.current = start;
        this.end = end;
    }
    
    [Symbol.asyncIterator]() {
        return {
            current: this.current,
            end: this.end,
            next() {
                if (this.current <= this.end) {
                    return Promise.resolve({ value: this.current++, done: false });
                }
                return Promise.resolve({ done: true });
            }
        };
    }
}

async function* processNumber(number) {
    yield await new Promise(resolve => setTimeout(() => resolve(number * 2), 100));
    yield await new Promise(resolve => setTimeout(() => resolve(number ** 2), 100));
}

(async function() {
    const range = new AsyncIterableRange(1, 5);
    for await (let num of range) {
        print(`Processing ${num}:`);
        for await (let result of processNumber(num)) {
            print(` Result: ${result}`);
        }
    }
})();
