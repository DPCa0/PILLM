 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ data: 'Sample Data' }), 1000);
    });
}

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessing ${property}: ${target[property]}`);
            return target[property];
        } else {
            print(`Property ${property} does not exist`);
            return null;
        }
    },
    set: function(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
    }
};

 
let targetObject = {
    name: 'Advanced JS',
    version: 1.0
};

 
const proxy = new Proxy(targetObject, handler);

 
async function complexOperation() {
    print('Starting complex operation...');

    const data = await fetchData();
    print('Data fetched:', data);

     
    print(proxy.name);
    proxy.version = 2.0;
    print(proxy.version);

    print('Complex operation completed.');
}

 
complexOperation();
