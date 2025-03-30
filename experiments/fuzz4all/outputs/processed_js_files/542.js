 

class DataStore {
    constructor() {
        this.data = new Map();
    }

    async fetchData(key) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(`Data for ${key}`), 1000);
        });
    }

    async get(key) {
        if (!this.data.has(key)) {
            const value = await this.fetchData(key);
            this.data.set(key, value);
        }
        return this.data.get(key);
    }
}

const handler = {
    get(target, property, receiver) {
        if (typeof target[property] === 'function') {
            return function (...args) {
                print(`Method ${property} was called with arguments:`, args);
                return target[property].apply(this, args);
            };
        }
        print(`Getting property '${property}'`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value);
    },
};

(async function () {
    const datastore = new DataStore();
    const proxiedDatastore = new Proxy(datastore, handler);

     
    const result = await proxiedDatastore.get('myKey');
    print(result);

    proxiedDatastore.data = new Map([['anotherKey', 'Some data']]);
    print(await proxiedDatastore.get('anotherKey'));
})();
