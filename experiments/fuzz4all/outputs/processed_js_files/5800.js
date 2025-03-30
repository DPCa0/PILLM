 

 
function* fetchDataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('Data 1'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data 2'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Data 3'), 1000));
}

 
async function fetchData() {
    const generator = fetchDataGenerator();
    for (let promise of generator) {
        print(await promise);
    }
}

 
const dataHandler = {
    get: (target, prop) => {
        print(`Getting ${prop}`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const data = {
    name: 'Initial',
    value: 42
};

 
const proxyData = new Proxy(data, dataHandler);

 
print(proxyData.name);
proxyData.name = 'Updated';
print(proxyData.name);

 
fetchData();
