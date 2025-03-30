 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const asyncOperation = async () => {
    await delay(1000);
    return 'Data Loaded';
};

const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return Reflect.get(target, prop, receiver);
        }
        console.error(`Property "${prop}" does not exist on target`);
        return undefined;
    },
    set: (target, prop, value) => {
        if (typeof value === 'string') {
            print(`Setting property "${prop}" to "${value}"`);
            return Reflect.set(target, prop, value);
        }
        console.error(`Failed to set property "${prop}". Value must be a string.`);
        return false;
    }
};

const dataSymbol = Symbol('data');

const fetchData = async () => {
    const response = await asyncOperation();
    const target = {
        [dataSymbol]: response
    };
    
    const proxy = new Proxy(target, handler);
    print(proxy[dataSymbol]);  
    proxy.name = 'JavaScript';  
    print(proxy.name);  
};

fetchData();
