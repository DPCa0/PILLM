 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function asyncOperation() {
    print('Starting async operation...');
    await delay(1000);
    print('Async operation complete!');
}

 
function* numberGenerator() {
    let number = 1;
    while (true) {
        yield number++;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property ${prop} has been accessed`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Property ${prop} is being set to ${value}`);
        return Reflect.set(...arguments);
    }
};

 
const exampleObject = {
    data: 'Some data',
    status: 'Active'
};

 
const proxy = new Proxy(exampleObject, handler);

 
(async function main() {
     
    await asyncOperation();
    
     
    const generator = numberGenerator();
    print(`Generated number: ${generator.next().value}`);
    print(`Generated number: ${generator.next().value}`);
    
     
    print(`Proxy object data: ${proxy.data}`);
    proxy.status = 'Inactive';
    print(`Proxy object status: ${proxy.status}`);
})();
