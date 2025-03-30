 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000);
    });
}

 
function* arrayGenerator(arr) {
    for (const item of arr) {
        yield item;
    }
}

 
const loggerHandler = {
    get: (target, prop, receiver) => {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const fruits = new Proxy({
    description: 'This is a list of fruits',
    list: []
}, loggerHandler);

 
async function main() {
    print(fruits.description);  
    const data = await fetchData();   

     
    const gen = arrayGenerator(data);
    let nextItem = gen.next();
    while (!nextItem.done) {
        fruits.list.push(nextItem.value);   
        nextItem = gen.next();
    }

     
    print(fruits.list);
}

 
main().catch(console.error);
