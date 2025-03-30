 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
    let count = 0;
    while (count < 3) {
        await delay(1000);  
        yield count++;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Property ${prop} doesn't exist.`);
        }
    },
    set: function(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

// Using Proxy with a simple object
const obj = new Proxy({ name: 'JavaScript' }, handler);

 
async function processGenerator() {
    for await (let value of asyncGenerator()) {
        print(`Generator yielded: ${value}`);
    }
}

 
processGenerator();

 
print(obj.name);
obj.age = 25;
print(obj.age);
