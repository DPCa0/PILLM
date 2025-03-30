 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
const loggerProxy = (obj) => {
    return new Proxy(obj, {
        get(target, property, receiver) {
            print(`Accessing property: ${property}`);
            return Reflect.get(target, property, receiver);
        },
        set(target, property, value, receiver) {
            print(`Setting property: ${property} to ${value}`);
            return Reflect.set(target, property, value, receiver);
        },
    });
};

 
function* asyncGenerator() {
    yield delay(1000).then(() => 'First');
    yield delay(2000).then(() => 'Second');
    yield delay(1000).then(() => 'Third');
}

 
async function processGenerator(gen) {
    for await (let value of gen) {
        print(value);
    }
}

 
const data = {
    name: 'JavaScript',
    version: 'ES2021',
};

 
const proxiedData = loggerProxy(data);

 
const { name, ...rest } = proxiedData;
print(name);  
proxiedData.newFeature = 'Proxy and Generators';  

 
processGenerator(asyncGenerator());

 
const nestedObject = { a: { b: null } };
print(nestedObject.a?.b ?? 'Default Value');  
