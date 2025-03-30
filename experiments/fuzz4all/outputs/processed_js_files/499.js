 
const createRange = function* (start = 0, end = Infinity, step = 1) {
    let count = 0;
    for (let i = start; i < end; i += step) {
        count++;
        yield i;
    }
    return count;
};

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const targetObject = { a: 10, b: 20 };
const proxyObject = new Proxy(targetObject, handler);

proxyObject.a;  
proxyObject.b = 30;  

 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

 
const url = "https://jsonplaceholder.typicode.com/posts/1";
fetchData(url)
    .then(data => console.log('Fetched data:', data))
    .catch(err => console.error('Fetch error:', err));

 
const map = new Map([
    ['name', 'Alice'],
    ['age', 25],
]);

map.set('occupation', 'Engineer');

const dataArray = Array.from(map.entries()).map(([key, value]) => ({ [key]: value }));

print('Data array:', dataArray);

 
const set = new Set([1, 2, 3, 4, 5, 5, 6]);
set.add(7).add(3);

print('Unique set:', Array.from(set));

 
const asyncOperations = async () => {
    const promises = [
        Promise.resolve(1),
        Promise.resolve(2),
        Promise.resolve(3),
    ];
    const results = await Promise.all(promises);
    print('Promise.all results:', results);
};

asyncOperations();

 
const userInfo = { id