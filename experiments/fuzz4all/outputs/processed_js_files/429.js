class AsyncGenerator {
    constructor(limit) {
        this.limit = limit;
    }

    async *generateSequence() {
        for (let i = 1; i <= this.limit; i++) {
            await new Promise(resolve => setTimeout(resolve, 100));
            yield i;
        }
    }
}

const enhancedArray = new Proxy([], {
    set(target, property, value) {
        if (typeof value === 'number') {
            target[property] = value ** 2;
            return true;
        }
        throw new TypeError('Only numbers are allowed');
    }
});

(async () => {
    const generator = new AsyncGenerator(5);
    const iterator = generator.generateSequence();
    for await (const value of iterator) {
        enhancedArray.push(value);
    }

    print('Squared Values:', enhancedArray);
})();

function createMultiplier(factor) {
    return (number) => number * factor;
}

const multiplyByFive = createMultiplier(5);
print('Multiplication Result:', multiplyByFive(6));
