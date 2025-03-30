 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* createIdGenerator() {
    let id = 0;
    while (true) {
        yield `ID_${++id}`;
    }
}

const idGenerator = createIdGenerator();

const handler = {
    get: function(target, prop) {
        if (typeof target[prop] === 'function') {
            return async function(...args) {
                await delay(100);
                return target[prop](...args);
            };
        }
        return Reflect.get(...arguments);
    }
};

class DataFetcher {
    constructor() {
        this.data = [];
        this[Symbol.iterator] = function* () {
            for (let item of this.data) {
                yield item;
            }
        };
    }

    async addItem(value) {
        this.data.push({ id: idGenerator.next().value, value });
    }

    async printData() {
        for await (let item of this) {
            print(item);
        }
    }
}

const proxyFetcher = new Proxy(new DataFetcher(), handler);

(async () => {
    await proxyFetcher.addItem("Hello");
    await proxyFetcher.addItem("World");
    await proxyFetcher.printData();
})();
