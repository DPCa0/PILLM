class AsyncResource {
    #data;
    constructor(fetchFunction) {
        this.#data = null;
        this.fetchFunction = fetchFunction;
    }
    async load() {
        this.#data = await this.fetchFunction();
    }
    get data() {
        if (this.#data === null) {
            throw new Error("Data not loaded. Call 'load()' first.");
        }
        return this.#data;
    }
}

async function fetchDataFromAPI() {
     
    return new Promise(resolve => setTimeout(() => resolve({ message: "Hello, world!" }), 1000));
}

const resource = new AsyncResource(fetchDataFromAPI);

 
const resourceProxy = new Proxy(resource, {
    get(target, prop, receiver) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop}`);
        return Reflect.set(target, prop, value, receiver);
    }
});

(async () => {
    try {
        await resourceProxy.load();
        print(resourceProxy.data.message);
    } catch (error) {
        console.error(error);
    }
})();
