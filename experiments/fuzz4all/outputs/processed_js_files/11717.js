 
class AsyncCounter {
    constructor(limit) {
        this.limit = limit;
        this.current = 0;
    }

    async *[Symbol.asyncIterator]() {
        while (this.current < this.limit) {
            await this._sleep(1000);
            yield ++this.current;
        }
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const executeCounter = async () => {
    const counter = new AsyncCounter(5);
    const results = [];

    for await (const value of counter) {
        print(`Count: ${value}`);
        results.push(value);
    }

     
    const [first, ...rest] = results;
    print(`First value: ${first}, Rest values: ${rest}`);

     
    print(`Attempting to access non-existent property: ${counter?.nonExistentProperty ?? 'Property does not exist'}`);

     
    const doubled = results.map(x => x * 2);
    print(`Doubled values: ${doubled}`);
};

 
executeCounter();
