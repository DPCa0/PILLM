 

 
function* dataGenerator() {
    yield* [1, 2, 3, 4, 5];
}

 
const handler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { key1: 'value1', key2: 'value2' };
const proxyObject = new Proxy(targetObject, handler);

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve([...dataGenerator()]), 1000);
    });
}

 
async function processData() {
    print('Fetching data...');
    const data = await fetchData();
    print('Data received:', data);

    print('Processing data...');
    data.forEach((item, index) => {
        proxyObject[`item${index}`] = item * 2;  
    });

    print('Processed data stored in proxyObject:');
    for (let i = 0; i < data.length; i++) {
        print(proxyObject[`item${i}`]);  
    }
}

processData();
