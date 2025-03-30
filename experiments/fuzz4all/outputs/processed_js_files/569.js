 

 
const asyncOperation = async (data) => {
    print(`Processing: ${data}`);
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Processed: ${data}`), 1000);
    });
};

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop, receiver);
        }
        return `Property ${prop} doesn't exist!`;
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

// Proxy object
const targetObject = {a: 1, b: 2};
const proxyObject = new Proxy(targetObject, handler);

proxyObject.a;      // Getting 'a'
proxyObject.b = 3;  // Setting 'b' to 3
print(proxyObject.c); // Property 'c' doesn't exist!

 
const main = async () => {
    const dataArray = ['first', 'second', 'third'];
    
     
    for (const item of dataArray) {
        const result = await asyncOperation(item);
        print(result);
    }
    
     
    print(proxyObject.b);  
};

 
main();
