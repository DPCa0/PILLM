 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve({id: 1, name: 'John Doe', age: 30}), 1000);
    });
}

 
const handler = {
    get: (target, prop) => {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        if (typeof value !== 'string' && prop === 'name') {
            throw new Error('Name must be a string');
        }
        return Reflect.set(target, prop, value);
    }
};

async function main() {
    const userData = await fetchData();
    
     
    const { id, name, age } = userData;

     
    const metadata = Symbol('metadata');
    
     
    const map = new Map();
    map.set(metadata, { fetchedAt: new Date() });

    const userProxy = new Proxy({ id, name, age, [metadata]: map.get(metadata) }, handler);
    
    print(userProxy.name);  
    userProxy.name = 'Jane Doe';  
    print(userProxy[metadata]);  

    try {
        userProxy.name = 123;  
    } catch (e) {
        console.error(e.message);
    }
}

main();
