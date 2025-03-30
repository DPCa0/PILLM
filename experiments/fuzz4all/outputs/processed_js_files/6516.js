 

 
const simulateAsyncOp = (time, value) => new Promise(resolve => setTimeout(() => resolve(value), time));

 
function* fetchDataGenerator() {
    yield simulateAsyncOp(1000, 'First Data');
    yield simulateAsyncOp(1000, 'Second Data');
    yield simulateAsyncOp(1000, 'Third Data');
}

 
async function handleDataFetching() {
    const dataGen = fetchDataGenerator();
    let result = dataGen.next();
    while (!result.done) {
        print('Fetching...');
        const data = await result.value;
        print(data);
        result = dataGen.next();
    }
}

 
const dataProxy = new Proxy({}, {
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    },
    get(target, property) {
        print(`Getting property '${property}'`);
        return target[property] || 'Not Found';
    }
});

 
dataProxy.name = 'Advanced JS';
print(dataProxy.name);
print(dataProxy.nonExistent);

 
handleDataFetching();
