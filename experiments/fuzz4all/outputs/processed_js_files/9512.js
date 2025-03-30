 
const randomDelay = (msg) => new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 1000);
    setTimeout(() => resolve(msg), delay);
});

 
async function* asyncGenerator() {
    for (const msg of ["Hello", "World", "from", "JavaScript"]) {
        yield await randomDelay(msg);
    }
}

 
(async () => {
    print("Starting async iteration:");
    for await (const msg of asyncGenerator()) {
        print(msg);
    }
    print("Async iteration complete!");
})();

 
const nums = [1, 2, 3, 4, 5];
const advancedManipulation = nums
    .map(num => ({ original: num, squared: num ** 2 }))
    .filter(obj => obj.squared % 2 === 0)
    .reduce((acc, obj) => acc + obj.squared, 0);

print("Advanced manipulation result:", advancedManipulation);

 
const handler = {
    get: (obj, prop) => (prop in obj ? obj[prop] : `Property "${prop}" not found`),
    set: (obj, prop, value) => {
        print(`Setting value ${value} to property "${prop}"`);
        obj[prop] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

print(proxy.a);  
print(proxy.nonExistent);  
proxy.c = 3;  
print(proxy.c);  
