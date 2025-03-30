 

 
function* asyncGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('First async operation completed'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second async operation completed'), 1000));
}

 
async function handleAsyncOperations(generator) {
    const iterator = generator();
    for (let promise of iterator) {
        print(await promise);
    }
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing property '${property}' with value: ${target[property]}`);
            return target[property];
        } else {
            return 'Property does not exist';
        }
    }
};

const obj = { name: 'Alice', age: 25 };
const proxy = new Proxy(obj, handler);

 
Reflect.set(proxy, 'name', 'Bob');
print(Reflect.get(proxy, 'name'));  
print(Reflect.get(proxy, 'occupation'));  

 
handleAsyncOperations(asyncGenerator);
