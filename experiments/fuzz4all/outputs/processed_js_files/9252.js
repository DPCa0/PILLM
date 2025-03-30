 

 
function asyncOperation(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve(`Processed data: ${data}`);
            } else {
                reject('No data provided');
            }
        }, 1000);
    });
}

 
async function processData(data) {
    try {
        const result = await asyncOperation(data);
        print(result);
    } catch (error) {
        console.error(error);
    }
}

 
const targetObject = {
    name: 'JavaScript',
    type: 'Programming Language'
};

 
const handler = {
    get: (obj, prop) => {
        print(`Getting property: ${prop}`);
        return prop in obj ? obj[prop] : `Property ${prop} not found`;
    },
    set: (obj, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(obj, prop, value);
    }
};

 
const proxyObject = new Proxy(targetObject, handler);

 
print(proxyObject.name);  
print(proxyObject.version);  
proxyObject.version = 'ES6';  
print(proxyObject.version);

 
processData('Sample Data');
processData(null);
