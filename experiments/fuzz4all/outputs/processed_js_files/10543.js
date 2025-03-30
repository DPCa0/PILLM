 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property "${prop}" not found`);
            return 'Default Value';
        }
    },
    set: function(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

let targetObject = { existingProp: 42 };
let proxyObject = new Proxy(targetObject, handler);

print(proxyObject.existingProp);  
print(proxyObject.nonExistentProp);  
proxyObject.newProp = 'Hello';  
print(proxyObject.newProp);  

 
let mySet = new Set([1, 2, 3, 3, 4]);
print([...mySet]);  

let myMap = new Map();
myMap.set('key1', 'value1').set('key2', 'value2');
for (let [key, value] of myMap.entries()) {
    print(key, value);
}

 
function* fibonacci(n) {
    let [a, b] = [0, 1];
    while (n-- > 0) {
        [a, b] = [b, a + b];
        yield a;
    }
}

for (let num of fibonacci(5)) {
    print(num);  
}

 
let obj = { a: 1, b: 2, c: 3 };
let { a, ...rest } = obj;
print(a);  
print(rest);  

let