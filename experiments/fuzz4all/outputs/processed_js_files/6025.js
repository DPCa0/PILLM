 
const uniqueKey = Symbol('uniqueKey');

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop === 'secret') {
            return `You've accessed the secret: ${Reflect.get(target, uniqueKey, receiver)}`;
        }
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        if (prop === 'secret') {
            print(`Modifying secret is not allowed.`);
            return false;
        }
        return Reflect.set(target, prop, value, receiver);
    }
};

// Create a target object with advanced features
const targetObject = {
    name: 'AdvancedJS',
    [uniqueKey]: 'The Ultimate Secret'
};

 
const proxyObject = new Proxy(targetObject, handler);

 
function processData({ name, ...rest }) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ greeting: `Hello, ${name}!`, details: rest });
        }, 1000);
    });
}

 
async function complexOperation() {
    print(proxyObject.name);  
    print(proxyObject.secret);  

    const { greeting, details } = await processData(proxyObject);
    print(greeting);  
    print(details);
}

complexOperation();
