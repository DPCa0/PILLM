class AsyncSequence {
    constructor(...generators) {
        this.generators = generators;
    }

    async *execute(input) {
        let result = input;
        for (const gen of this.generators) {
            result = await this.runGenerator(gen(result));
        }
        yield result;
    }

    async runGenerator(generator) {
        let result;
        for await (const value of generator) {
            result = value;
        }
        return result;
    }
}

const asyncGen1 = async function* (input) {
    yield new Promise(resolve => setTimeout(() => resolve(input + 1), 1000));
};

const asyncGen2 = async function* (input) {
    yield new Promise(resolve => setTimeout(() => resolve(input * 2), 1000));
};

const asyncGen3 = async function* (input) {
    yield new Promise(resolve => setTimeout(() => resolve(input - 3), 1000));
};

(async () => {
    const sequence = new AsyncSequence(asyncGen1, asyncGen2, asyncGen3);
    for await (const result of sequence.execute(5)) {
        print(result);  
    }
})();
