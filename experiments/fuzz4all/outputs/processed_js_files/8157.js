class ComplexOperations {
    constructor() {
        this.numbers = [1, 2, 3, 4, 5];
    }

    async processNumbers() {
        const squared = this.numbers.map(num => num ** 2);
        const total = await this.fetchDataFromServer(squared);
        print(`Total sum of squares: ${total}`);
    }

    fetchDataFromServer(data) {
        return new Promise(resolve => {
            setTimeout(() => {
                const sum = data.reduce((acc, val) => acc + val, 0);
                resolve(sum);
            }, 1000);
        });
    }
}

(async () => {
    const operations = new ComplexOperations();
    await operations.processNumbers();

    const setOperations = new Set(['add', 'delete', 'has']);
    print('Set Operations:', setOperations);

    const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
    for (let [key, value] of map) {
        print(`Map Key: ${key}, Value: ${value}`);
    }

    const proxyHandler = {
        get: (target, prop) => {
            print(`Accessing property "${prop}"`);
            return target[prop];
        }
    };

    const proxy = new Proxy({ a: 10, b: 20 }, proxyHandler);
    print('Proxy value for a:', proxy.a);
    print('Proxy value for b:', proxy.b);
})();
