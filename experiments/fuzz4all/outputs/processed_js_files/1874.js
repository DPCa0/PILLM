 

 
function asyncTask(value, delay) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(value), delay);
    });
}

 
function* asyncGenerator() {
    const value1 = yield asyncTask("Task 1 complete", 1000);
    print(value1);
    const value2 = yield asyncTask("Task 2 complete", 500);
    print(value2);
    const value3 = yield asyncTask("Task 3 complete", 2000);
    print(value3);
    return "All tasks complete";
}

 
async function runGenerator(genFunc) {
    const iterator = genFunc();
    let result = iterator.next();
    
    while (!result.done) {
        result = iterator.next(await result.value);
    }
    
    return result.value;
}

 
const targetObject = {
    prop1: "Hello",
    prop2: "World",
};

const handler = {
    get(target, property, receiver) {
        print(`Getting ${property}`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value, receiver);
    },
};

const proxiedObject = new Proxy(targetObject, handler);

 
print(proxiedObject.prop1);  
proxiedObject.prop2 = "JavaScript";  
print(proxiedObject.prop2);  

 
runGenerator(asyncGenerator).then((message) => {
    print(message);  
});
