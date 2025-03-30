 

 
function* dataGenerator() {
    yield Promise.resolve('Fetching User');
    yield new Promise(resolve => setTimeout(() => resolve('Fetching Orders'), 1000));
    yield Promise.resolve('Fetching Products');
}

 
async function processData(generator) {
    for await (let promise of generator()) {
        print(await promise);
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing ${prop}: ${target[prop]}`);
            return target[prop];
        } else {
            console.error(`Property ${prop} doesn't exist.`);
        }
    }
};

// Creating a Proxy for the user object
const user = {
    name: 'Alice',
    age: 30,
    role: 'Admin'
};

const userProxy = new Proxy(user, handler);

 
(async () => {
    await processData(dataGenerator);
    print(userProxy.name);   
    print(userProxy.email);  
})();
