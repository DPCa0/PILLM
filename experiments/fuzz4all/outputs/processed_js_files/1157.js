 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* generatorWithDelay() {
    yield delay(1000).then(() => 'First value after 1 second');
    yield delay(2000).then(() => 'Second value after 2 seconds');
    yield delay(3000).then(() => 'Third value after 3 seconds');
}

 
async function handleGenerator(generator) {
    for await (let promise of generator()) {
        print(await promise);
    }
}

 
const handler = {
    get(target, property, receiver) {
        print(`Getting property '${property}'`);
        return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(target, property, value, receiver);
    }
};

 
const targetObject = {
    name: 'John Doe',
    age: 30
};

 
const proxiedObject = new Proxy(targetObject, handler);

 
function interactWithProxy() {
    print(proxiedObject.name);   
    proxiedObject.age = 31;            
    print(proxiedObject.age);    
}

 
async function run() {
    await handleGenerator(generatorWithDelay);
    interactWithProxy();
}

run();
