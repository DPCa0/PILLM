 

class DataStore {
    constructor(data) {
        this.data = data;
    }

    async fetchData(key) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (this.data[key] !== undefined) {
                    resolve(this.data[key]);
                } else {
                    reject(new Error('Data not found'));
                }
            }, 1000);
        });
    }
}

const loggerHandler = {
    get(target, property, receiver) {
        print(`Attempting to access property "${property}"`);
        return Reflect.get(target, property, receiver);
    },
    apply(target, thisArg, argumentsList) {
        print(`Calling function "${target.name}" with arguments: ${argumentsList}`);
        return Reflect.apply(target, thisArg, argumentsList);
    }
};

const dataStore = new DataStore({
    name: "Advanced JavaScript",
    year: 2023,
    topic: "Proxies & Reflect"
});

const proxyDataStore = new Proxy(dataStore, loggerHandler);

(async () => {
    try {
        print('Fetching name...');
        const name = await proxyDataStore.fetchData('name');
        print(`Name: ${name}`);

        print('Fetching year...');
        const year = await proxyDataStore.fetchData('year');
        print(`Year: ${year}`);
    } catch (error) {
        console.error(error);
    }
})();
