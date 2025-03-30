 

 
function* createAsyncTasks() {
    yield new Promise(resolve => setTimeout(() => resolve('First task complete'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second task complete'), 2000));
    yield new Promise(resolve => setTimeout(() => resolve('Third task complete'), 3000));
}

 
const handler = {
    get: (target, prop) => {
        print(`Property '${prop}' has been accessed`);
        return prop in target ? target[prop] : 'Property does not exist';
    },
    set: (target, prop, value) => {
        print(`Setting '${prop}' to '${value}'`);
        target[prop] = value;
        return true;
    }
};

 
async function runTasks() {
    const taskGenerator = createAsyncTasks();
    for (let taskPromise of taskGenerator) {
        print(await taskPromise);
    }
}

 
const monitoredObject = {
    propertyOne: 'Value One',
    propertyTwo: 'Value Two'
};

 
const proxyObject = new Proxy(monitoredObject, handler);

 
(async () => {
     
    print(proxyObject.propertyOne);
    print(proxyObject.propertyTwo);
    print(proxyObject.propertyThree);  

     
    proxyObject.propertyThree = 'Value Three';
    print(proxyObject.propertyThree);

     
    await runTasks();
})();
