 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Data fetched'), 1000);
    });
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const uniqueKey = Symbol('uniqueKey');

let dataStore = {
    [uniqueKey]: 'Initial data'
};

 
const proxiedDataStore = new Proxy(dataStore, handler);

(async function main() {
    proxiedDataStore[uniqueKey] = await fetchData();
    print(proxiedDataStore[uniqueKey]);

     
    const map = new Map();
    map.set('key1', { detail: 'This is a detailed object' });
    map.set('key2', { detail: 'Another detailed object' });

     
    for (const [key, value] of map) {
        print(`Key: ${key}, Value: ${JSON.stringify(value)}`);
    }
})();
