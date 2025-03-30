 

 
const uniqueData = Symbol('data');

 
function* promiseGenerator() {
    let delay = 100;
    for (let i = 1; i <= 5; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), delay));
        delay += 100;
    }
}

 
async function consumeGenerator(gen) {
    const result = [];
    for (let promise of gen) {
        const value = await promise;
        result.push(value);
    }
    return result;
}

 
const handler = {
    get(target, prop) {
        if (prop === 'getData') {
            return () => target[uniqueData];
        }
        if (prop in target) {
            return target[prop];
        }
        return `Property ${prop} does not exist.`;
    }
};

 
const myObject = {
    [uniqueData]: 'Secret Data',
    name: 'My Object',
    description: 'This is a proxied object.'
};

 
const proxiedObject = new Proxy(myObject, handler);

 
async function main() {
     
    print(proxiedObject.name);
    print(proxiedObject.getData());
    print(proxiedObject.nonExistentProperty);

     
    const result = await consumeGenerator(promiseGenerator());
    print('Generator Results:', result);
}

main();
