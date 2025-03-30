 

 
function* fetchDataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve("Data 1"), 1000));
    yield new Promise(resolve => setTimeout(() => resolve("Data 2"), 1000));
    yield new Promise(resolve => setTimeout(() => resolve("Data 3"), 1000));
}

 
async function asyncDataHandler(gen) {
    for (let promise of gen) {
        const data = await promise;
        print("Fetched:", data);
    }
}

 
const target = { data: "Secret Data" };
const handler = {
    get: function(obj, prop) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(obj, prop, value) {
        print(`Setting property: ${prop} with value: ${value}`);
        return Reflect.set(...arguments);
    }
};

const proxy = new Proxy(target, handler);

 
print(proxy.data);
proxy.data = "New Data";

 
const generator = fetchDataGenerator();
asyncDataHandler(generator);
