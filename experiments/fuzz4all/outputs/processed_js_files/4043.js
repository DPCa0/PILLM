 

 
function* fetchData() {
    yield new Promise(resolve => setTimeout(() => resolve("Data 1"), 1000));
    yield new Promise(resolve => setTimeout(() => resolve("Data 2"), 1000));
    yield new Promise(resolve => setTimeout(() => resolve("Data 3"), 1000));
}

 
async function processData() {
    const dataGenerator = fetchData();
    let result = dataGenerator.next();

    while (!result.done) {
        const data = await result.value;
        print("Fetched:", data);
        result = dataGenerator.next();
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        if (typeof value === 'string') {
            value = value.toUpperCase();
        }
        return Reflect.set(target, prop, value);
    }
};

 
const targetObj = {
    name: "example",
    value: 42
};

 
const proxyObj = new Proxy(targetObj, handler);

 
print(proxyObj.name);   
proxyObj.name = "newName";    
print(proxyObj.name);   

 
processData();
