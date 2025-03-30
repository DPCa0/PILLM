 

 
function fetchData() {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 1000) + 500;
        setTimeout(() => resolve(`Data fetched after ${delay} ms`), delay);
    });
}

 
function* dataFetcher() {
    yield fetchData();
    yield fetchData();
    yield fetchData();
}

 
async function processGenerator(generator) {
    const iterator = generator();
    for (const promise of iterator) {
        const result = await promise;
        print(result);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function(...args) {
                print(`Calling ${prop} with`, args);
                return target[prop].apply(this, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
const api = {
    fetchUser(id) {
        return `User ${id} data`;
    },
    updateUser(id, data) {
        return `User ${id} updated with ${JSON.stringify(data)}`;
    }
};

 
const proxiedApi = new Proxy(api, handler);

 
async function demonstrateAdvancedFeatures() {
    print(proxiedApi.fetchUser(1));
    print(proxiedApi.updateUser(2, { name: 'Alice', age: 30 }));

    await processGenerator(dataFetcher);
}

 
demonstrateAdvancedFeatures();
