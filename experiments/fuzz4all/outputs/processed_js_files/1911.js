 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator(max) {
    for (let i = 0; i <= max; i++) {
        yield i;
    }
}

 
async function processNumbers(generator) {
    for (const num of generator) {
        await delay(100);  
        print(`Processed: ${num}`);
    }
}

 
const handler = {
    get: (target, prop) => {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Set property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
Reflect.set(user, 'name', 'Bob');
Reflect.get(user, 'name');
Reflect.set(user, 'age', 30);

 
processNumbers(numberGenerator(5));
