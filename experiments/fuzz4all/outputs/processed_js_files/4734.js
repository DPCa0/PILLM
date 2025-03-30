 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function apiCall(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Received data: ${data}`), 1000);
    });
}

 
async function processFibonacci() {
    const fibGen = fibonacci();
    for await (const num of {
        [Symbol.asyncIterator]: () => ({
            next: async () => {
                const value = fibGen.next().value;
                if (value > 100) return { done: true };
                const response = await apiCall(value);
                print(response);
                return { done: false, value };
            }
        })
    }) {
         
    }
}

 
processFibonacci();

 
const obj = { a: 1, b: 2, c: 3 };
const handler = {
    get(target, property) {
        print(`Property '${property}' accessed.`);
        return target[property];
    }
};
const proxyObj = new Proxy(obj, handler);

 
print(proxyObj.a);  
print(proxyObj.b);  

 
const map = new Map();
const weakMap = new WeakMap();

const key1 = {};
const key2 = {};

map.set(key1, 'value1');
weakMap.set(key2, 'value2');

print(map.get(key1));  
print(weakMap.get(key2));  

 
const { a, ...rest } = proxyObj;
print(a);  
print(rest);  
