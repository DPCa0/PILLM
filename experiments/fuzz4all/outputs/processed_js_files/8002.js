 

 
async function* dataStream() {
    let data = ["apple", "banana", "cherry"];
    for (let item of data) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

 
const loggingHandler = {
    get(target, property) {
        print(`Accessing property: ${property}`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

 
let dataObject = {
    fruit: "unknown",
    quantity: 0
};

 
let proxyDataObject = new Proxy(dataObject, loggingHandler);

 
async function processData() {
    const iterator = dataStream();
    for await (const value of iterator) {
        proxyDataObject.fruit = value;
        proxyDataObject.quantity += 1;
        print(`Processed: ${proxyDataObject.fruit}, Total: ${proxyDataObject.quantity}`);
    }
}

 
processData();
