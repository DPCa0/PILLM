 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function fetchDataWithDelay(data, ms) {
    print(`Fetching data: ${data}`);
    await delay(ms);
    print(`Data fetched: ${data}`);
    return `Processed ${data}`;
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generator = idGenerator();

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const dataStore = {
    data1: 42,
    data2: "hello"
};

 
const proxyDataStore = new Proxy(dataStore, handler);

 
(async function main() {
    proxyDataStore.data1 = 100;
    print(proxyDataStore.data2);
    
     
    const results = await Promise.all([
        fetchDataWithDelay("Item1", 1000),
        fetchDataWithDelay("Item2", 500),
        fetchDataWithDelay("Item3", 1500)
    ]);

    print(results);

     
    print(`Generated IDs: ${generator.next().value}, ${generator.next().value}, ${generator.next().value}`);
})();
