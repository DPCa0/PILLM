 

 
function delayedTask(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

 
function* taskGenerator() {
    yield delayedTask(1000, 'Task 1 complete');
    yield delayedTask(2000, 'Task 2 complete');
    yield delayedTask(1500, 'Task 3 complete');
}

 
async function processTasks() {
    const gen = taskGenerator();

    for (let promise of gen) {
        let result = await promise;
        print(result);
    }
}

 
const targetObject = {
    prop1: 10,
    prop2: 20
};

const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return prop in obj ? obj[prop] : 'Property not found';
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxiedObject = new Proxy(targetObject, handler);

 
processTasks();

 
print(proxiedObject.prop1);  
proxiedObject.prop3 = 30;          
print(proxiedObject.prop3);  
