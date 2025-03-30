 
const handler = {
    get(target, property) {
        print(`Getting property: ${property}`);
        return property in target ? target[property] : 42;  
    },
    set(target, property, value) {
        print(`Setting property: ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { a: 1, b: 2 };
const proxy = new Proxy(targetObject, handler);

 
proxy.a;  
proxy.b = 10;  
print(proxy.c);  

 
function* fibonacci(n) {
    let a = 0, b = 1, i = 0;
    while (i < n) {
        yield a;
        [a, b] = [b, a + b];
        i++;
    }
}

 
const [first, ...rest] = [...fibonacci(5)];
print(`First: ${first}, Rest: ${rest}`);  

 
async function fetchData() {
    const fakeApiCall = new Promise((resolve) => {
        setTimeout(() => resolve("Fetched Data"), 1000);
    });

    try {
        const data = await fakeApiCall;
        print(data);  
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
fetchData();

 
const sym1 = Symbol('key1');
const sym2 = Symbol('key2');
const map = new Map();

map.set(sym1, 'value1');
map.set(sym2, 'value2');

print(map.get(sym1));  
print(map.get(sym2));  

 
async function getData() {
    return "Data";
}

async function getMoreData() {
    return "More Data";
}

Promise.all([getData(), getMoreData()])
    .then(results => {
        print(results);  
    })
    .