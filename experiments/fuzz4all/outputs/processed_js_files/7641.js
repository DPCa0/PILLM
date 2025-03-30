 

 
const handler = {
    get: (target, prop) => {
        print(`Getting property: ${prop}`);
        if (prop in target) {
            return target[prop];
        } else {
            return 'Property does not exist';
        }
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = {};
const proxyObject = new Proxy(targetObject, handler);

 
function* dataGenerator() {
    yield 'Data 1';
    yield 'Data 2';
    yield* ['Data 3', 'Data 4'];
}

const dataIter = dataGenerator();

 
const fetchData = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            print(`Fetched: ${data}`);
            resolve(`Processed: ${data}`);
        }, 1000);
    });
};

 
async function processAllData() {
    for (const data of dataIter) {
        const processedData = await fetchData(data);
        print(processedData);
    }
}

 
proxyObject.newProp = 'New Value';
print(proxyObject.newProp);
print(proxyObject.nonExistentProp);

 
processAllData();
