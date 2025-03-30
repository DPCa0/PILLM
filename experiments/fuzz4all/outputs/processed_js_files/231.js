 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* dataStream() {
    const data = ['🍎', '🍌', '🍇', '🍓', '🍍'];
    for (let item of data) {
        await delay(500);
        yield item;
    }
}

 
const fetchSymbol = Symbol('fetching');

 
const handler = {
    get(target, prop, receiver) {
        if (prop === fetchSymbol) return target[prop];
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        if (prop === fetchSymbol) {
            print(`Fetch state: ${value}`);
        }
        return Reflect.set(...arguments);
    }
};

const fetchTracker = new Proxy({ [fetchSymbol]: false }, handler);

 
async function fetchData() {
    fetchTracker[fetchSymbol] = true;
    const data = [];
    for await (let item of dataStream()) {
        data.push(item);
    }
    fetchTracker[fetchSymbol] = false;
    return data;
}

 
(async () => {
    print('Starting data fetch...');
    const result = await fetchData();
    print('Fetched data:', result);
})();
