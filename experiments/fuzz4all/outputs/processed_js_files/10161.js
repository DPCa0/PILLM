class AsyncComplexity {
    constructor() {
        this.data = [1, 2, 3, 4, 5];
    }
    
    async #privateMethod() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.data.map(x => x * 2));
            }, 1000);
        });
    }

    async fetchData() {
        print('Fetching data...');
        const result = await this.#privateMethod();
        print('Data fetched:', result);
        return result;
    }

    static *generatorExample() {
        yield* [10, 20, 30];
    }

    #decoratorExample(method) {
        return (...args) => {
            print('Before execution');
            const result = method.apply(this, args);
            print('After execution');
            return result;
        };
    }

    @this.#decoratorExample
    simpleMethod() {
        print('Simple method executed');
    }

    static async execute() {
        const instance = new AsyncComplexity();
        const asyncResult = await instance.fetchData();
        print('Async Result:', asyncResult);

        for (let value of AsyncComplexity.generatorExample()) {
            print('Generator Value:', value);
        }

        instance.simpleMethod();
    }
}

AsyncComplexity.execute().catch(console.error);
