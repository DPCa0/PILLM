 

 
function* fetchDataSimulator() {
    yield new Promise(res => setTimeout(() => res('Data chunk 1'), 1000));
    yield new Promise(res => setTimeout(() => res('Data chunk 2'), 1000));
    yield new Promise(res => setTimeout(() => res('Data chunk 3'), 1000));
}

 
async function asyncDataHandler(generator) {
    for await (const chunk of generator) {
        print(`Received: ${chunk}`);
    }
}

 
const handler = {
    get(target, prop) {
        print(`Accessing property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const dataObject = {
    a: 10,
    b: 20
};

const proxiedData = new Proxy(dataObject, handler);

 
proxiedData.a = 30;
print(proxiedData.b);

 
const dataGenerator = fetchDataSimulator();
asyncDataHandler(dataGenerator);
