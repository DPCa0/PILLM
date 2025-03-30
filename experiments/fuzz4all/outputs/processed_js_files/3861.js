 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
    const { data } = await fetch(url).then(response => response.json());
    return data;
}

 
const target = { message: 'Hello, Proxy!' };
const handler = {
    set(obj, prop, value) {
        print(`Property ${prop} set to ${value}`);
        obj[prop] = value;
        return true;
    }
};
const proxy = new Proxy(target, handler);

 
const uniqueKey = Symbol('uniqueKey');
const object = {
    [uniqueKey]: 'This is a unique symbol key'
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
(async () => {
    print(object[uniqueKey]);
    
    proxy.message = 'Hello, again!';
    
    const idGen = idGenerator();
    print(idGen.next().value);  
    print(idGen.next().value);  

    await delay(1000);
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    print(data);
})();
