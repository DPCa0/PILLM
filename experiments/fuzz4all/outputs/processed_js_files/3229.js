 

 
function fetchData(item) {
    return new Promise((resolve) => setTimeout(() => resolve(`Fetched ${item}`), 1000));
}

 
async function* fetchItems(items) {
    for (const item of items) {
        const result = await fetchData(item);
        yield result;
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Accessing property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            print(`Attempted to access non-existing property: ${prop}`);
            return undefined;
        }
    },
    set: (target, prop, value, receiver) => {
        print(`Setting value for property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const targetObj = {
    name: 'Advanced JavaScript',
    difficulty: 'High'
};

 
const proxyObj = new Proxy(targetObj, handler);

 
print(proxyObj.name);  
proxyObj.level = 'Advanced';  
print(proxyObj.unknownProp);  

 
(async () => {
    const items = ['item1', 'item2', 'item3'];
    for await (const item of fetchItems(items)) {
        print(item);
    }
})();
