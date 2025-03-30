class AsyncOperation {
    constructor(value) {
        this.value = value;
    }
    
    async *asyncGenerator() {
        for (let i = 0; i < this.value; i++) {
            yield new Promise(resolve => setTimeout(() => resolve(i * 2), 100));
        }
    }

    async execute() {
        const results = [];
        for await (let val of this.asyncGenerator()) {
            results.push(val);
        }
        return results;
    }
}

const computeResult = (values) => {
    return values.reduce((acc, curr) => acc + curr, 0);
};

(async () => {
    try {
        const asyncOp = new AsyncOperation(5);
        const results = await asyncOp.execute();
        const total = computeResult(results);
        
        print(`Results: ${results.join(', ')}`);
        print(`Total: ${total}`);
        
        const [a, b, ...rest] = results;
        print(`Destructured: a=${a}, b=${b}, rest=${rest.join(', ')}`);
        
        const doubleIt = (x) => x * 2;
        const doubledResults = results.map(doubleIt);
        print(`Doubled Results: ${doubledResults.join(', ')}`);
        
    } catch (error) {
        console.error('Error:', error);
    }
})();
