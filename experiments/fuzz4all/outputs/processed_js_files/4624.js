 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const loggerHandler = {
    get(target, property) {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    },
    set(target, property, value) {
        print(`Property '${property}' is being set to '${value}'.`);
        target[property] = value;
        return true;
    }
};

 
const user = { name: 'Alice', age: 25 };
const proxyUser = new Proxy(user, loggerHandler);

 
const privateMethod = Symbol('privateMethod');

const exampleObject = {
    [privateMethod]() {
        return 'This is a private method accessed using a Symbol.';
    },
    publicMethod() {
        return Reflect.apply(this[privateMethod], this, []);
    }
};

 
async function executeAsyncOperations() {
     
    proxyUser.name;  
    proxyUser.age = 30;  

     
    print(exampleObject.publicMethod());

     
    print('Async operations starting...');
    await Promise.all([delay(1000), delay(1500)]);  
    print('Async operations completed.');
}

 
(async () => {
    try {
        await executeAsyncOperations();
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
