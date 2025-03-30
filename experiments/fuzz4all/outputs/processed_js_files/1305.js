 
async function* asyncGenerator() {
    const values = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
    for (const value of values) {
        yield await value;
    }
}

async function processGenerator() {
    for await (const value of asyncGenerator()) {
        print(`Processed value: ${value}`);
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop === 'info') {
            return `Intercepted property: ${prop}`;
        }
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        if (prop === 'newValue') {
            print(`Setting new value through proxy: ${value}`);
            target[prop] = value;
            return true;
        }
        return false;
    }
};

let obj = { existingValue: 42 };
const proxyObj = new Proxy(obj, handler);

print(proxyObj.info);
proxyObj.newValue = 100;  
print(`Original object newValue: ${obj.newValue}`);  

proxyObj.existingValue = 50;  
print(`Original object existingValue: ${obj.existingValue}`);  

processGenerator();
