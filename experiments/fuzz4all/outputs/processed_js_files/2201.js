 
const targetObject = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
};

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return `Accessed property ${prop} with value ${obj[prop]}`;
        } else {
            return `Property ${prop} does not exist`;
        }
    },
    set: (obj, prop, value) => {
        if (typeof value === 'number' && value > 0) {
            print(`Updating property ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        } else {
            console.error(`Invalid value for ${prop}: ${value}`);
            return false;
        }
    }
};

const proxy = new Proxy(targetObject, handler);

 
async function* fetchData() {
    const data = [1, 2, 3, 4, 5];
    for (const item of data) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield item;
    }
}

 
const uniqueProperty = Symbol('unique');

 
proxy.age = 31;  
print(proxy.firstName);  
proxy.age = -1;  
print(proxy.middleName);  

 
(async () => {
    for await (const value of fetchData()) {
        print(`Received: ${value}`);
    }
})();

 
proxy[uniqueProperty] = 'UniqueValue';
print(proxy[uniqueProperty]);  
print(Object.keys(proxy));  
