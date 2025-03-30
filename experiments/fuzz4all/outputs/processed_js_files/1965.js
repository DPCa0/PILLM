 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    print('Fetching data...');
    await delay(1000);
    return { user: 'Alice', age: 30 };
}

 
const uniqueId = Symbol('id');

 
const userHandler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
function* objectIterator(obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

(async () => {
     
    const userData = await fetchData();
    userData[uniqueId] = 12345;  
    const userProxy = new Proxy(userData, userHandler);

     
    userProxy.name = 'Bob';
    print(userProxy.name);

     
    for (let [key, value] of objectIterator(userProxy)) {
        print(`${key}: ${value}`);
    }
})();
