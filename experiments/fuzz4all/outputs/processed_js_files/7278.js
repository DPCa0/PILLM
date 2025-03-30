 

 
function* fetchData() {
    yield new Promise((resolve) => setTimeout(() => resolve('Data Part 1'), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve('Data Part 2'), 1000));
    yield new Promise((resolve) => setTimeout(() => resolve('Data Part 3'), 1000));
}

 
async function handleDataFetch(generator) {
    for (const promise of generator) {
        const data = await promise;
        print(data);
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Getting ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    }
};

const dataObject = new Proxy({ key: 'initial' }, handler);

 
(async function main() {
    const dataGen = fetchData();
    print('Fetching data asynchronously:');
    await handleDataFetch(dataGen);

    print('\nInteracting with proxied object:');
    print(dataObject.key);  
    dataObject.key = 'updated';   
    print(dataObject.key);  
})();
