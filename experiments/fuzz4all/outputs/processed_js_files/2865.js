 

 
function* fetchDataGenerator(data) {
    for (let item of data) {
        yield new Promise(resolve => setTimeout(() => resolve(item), Math.random() * 1000));
    }
}

 
async function processAsyncData(data) {
    const generator = fetchDataGenerator(data);
    for (let promise of generator) {
        try {
            let result = await promise;
            print(`Processed: ${result}`);
        } catch (error) {
            console.error(`Error processing data: ${error}`);
        }
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Getting property ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value.toUpperCase();
        return true;
    }
};

const targetObject = { name: 'default' };
const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.name = 'proxyDemo';
print(proxyObject.name);  

 
const mockData = ['Data1', 'Data2', 'Data3', 'Data4'];

 
processAsyncData(mockData);
