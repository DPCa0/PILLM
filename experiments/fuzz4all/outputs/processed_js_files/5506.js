 

 
const asyncOperation = (time, message) => new Promise(resolve => {
    setTimeout(() => resolve(message), time);
});

 
async function fetchData() {
    try {
        let data1 = await asyncOperation(1000, "Data 1 loaded");
        let data2 = await asyncOperation(2000, "Data 2 loaded");
        return [data1, data2];
    } catch (error) {
        console.error("Error loading data:", error);
    }
}

 
function* dataGenerator() {
    yield* ["Generated Data 1", "Generated Data 2", "Generated Data 3"];
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`GET ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`SET ${String(prop)} = ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

let dataStore = { info: null };
let proxyDataStore = new Proxy(dataStore, handler);

(async function() {
     
    const results = await fetchData();
    proxyDataStore.info = results;
    
     
    const generator = dataGenerator();
    for (let data of generator) {
        print(data);
    }

     
    print("Final proxyDataStore:", proxyDataStore.info);
})();
