 

 
async function asyncOperation(value) {
    return new Promise((resolve) => setTimeout(() => resolve(value * 2), 1000));
}

 
function* numberGenerator(numbers) {
    for (let number of numbers) {
        yield asyncOperation(number);
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return property in target ? target[property] : 42;
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const targetObject = { name: 'ProxyObject' };
const proxyObject = new Proxy(targetObject, handler);

 
(async function processNumbers() {
    const numbers = [1, 2, 3, 4, 5];
    const gen = numberGenerator(numbers);

    for await (let result of gen) {
        print(`Processed result: ${result}`);
    }

     
    print(proxyObject.name);  
    proxyObject.age = 30;  
    print(proxyObject.age);  
})();

