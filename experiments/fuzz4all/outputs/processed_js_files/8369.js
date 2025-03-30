 
const uniqueId = Symbol('id');

 
const handler = {
    get: function(target, property, receiver) {
        if (property in target) {
            return Reflect.get(...arguments);
        } else {
            return `Property "${property}" does not exist.`;
        }
    },
    set: function(target, property, value, receiver) {
        if (typeof value === 'number') {
            return Reflect.set(target, property, value, receiver);
        } else {
            print(`Invalid type for property "${property}". Please use a number.`);
            return false;
        }
    }
};

 
const target = {
    [uniqueId]: 12345,
    name: 'Advanced JS Object',
    values: [1, 2, 3, 4]
};

 
const proxy = new Proxy(target, handler);

 
function* valueGenerator(arr) {
    for (let value of arr) {
        yield value;
    }
}

 
async function asyncFunction() {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("Hello from the Promise!"), 1000);
    });
    print(await promise);
}

 
(async () => {
    print(proxy.name);             
    print(proxy.nonexistent);      
    
    proxy.newValue = 'test';             
    proxy.newValue = 42;                 
    
    print(proxy[uniqueId]);        

    const generator = valueGenerator(proxy.values);
    print(generator.next().value);  
    print(generator.next().value);  

    await asyncFunction();               
})();
