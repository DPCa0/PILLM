 

 
async function* fetchData() {
    const data = [
        { id: 1, value: 'Alpha' },
        { id: 2, value: 'Beta' },
        { id: 3, value: 'Gamma' }
    ];

    for (let item of data) {
        await new Promise(resolve => setTimeout(resolve, 500));  
        yield item;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} does not exist`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
async function processData() {
    const generator = fetchData();
    let proxyData = {};

    for await (let item of generator) {
        proxyData = new Proxy(item, handler);
        print(proxyData.value);  
        proxyData.newProp = 'New Value';  
        print(proxyData.nonExistentProp);  
    }
}

 
processData();
