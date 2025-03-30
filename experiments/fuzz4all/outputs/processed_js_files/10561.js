class AsyncHandler {
    #data;
    constructor() {
        this.#data = new Map();
    }

    async fetchData(key) {
        if (this.#data.has(key)) {
            return this.#data.get(key);
        }
         
        const result = await new Promise((resolve) => 
            setTimeout(() => resolve(`Fetched data for ${key}`), 1000)
        );
        this.#data.set(key, result);
        return result;
    }
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield `id-${id++}`;
    }
}

const handler = new AsyncHandler();
const gen = idGenerator();

(async () => {
    const ids = Array.from({ length: 5 }, () => gen.next().value);
    const results = await Promise.all(ids.map(id => handler.fetchData(id)));
    print(results);
})();

 
const handlerProxy = new Proxy(handler, {
    get(target, prop, receiver) {
        const origMethod = target[prop];
        return function(...args) {
            print(`Calling ${prop} with arguments: ${JSON.stringify(args)}`);
            return origMethod.apply(this, args);
        };
    }
});

(async () => {
    const key = 'special-id';
    await handlerProxy.fetchData(key);
})();
