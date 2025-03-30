 

 
function* asyncGenerator() {
    yield new Promise((resolve) => setTimeout(() => resolve("Data 1"), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve("Data 2"), 2000));
    yield new Promise((resolve) => setTimeout(() => resolve("Data 3"), 3000));
}

 
async function handleAsync(generator) {
    for (let promise of generator) {
        let result = await promise;
        print(result);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property: ${prop}`);
            return target[prop];
        }
        print(`Property ${prop} does not exist`);
        return undefined;
    },
    set: function(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const dataStore = {};

 
const proxyDataStore = new Proxy(dataStore, handler);

 
proxyDataStore.name = "Advanced JS";
print(proxyDataStore.name);
print(proxyDataStore.nonExistentProperty);

 
handleAsync(asyncGenerator());
