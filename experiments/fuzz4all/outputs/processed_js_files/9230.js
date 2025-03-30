 
const range = (start, end) => Array.from({ length: end - start }, (_, i) => start + i);

 
const logger = obj => new Proxy(obj, {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Accessing property '${prop}':`, Reflect.get(target, prop, receiver));
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property '${prop}' does not exist`);
        }
    }
});

 
const fetchData = async (url) => {
    try {
        print(`Fetching data from ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield prev;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const showMessage = (name, count) => print(`Hello, ${name}! You have ${count} new messages.`);

 
const map = new Map();
const logAndSet = (key, value, callback) => {
    print(`Setting ${key} to ${value}`);
    map.set(key, value);
    if (callback) callback(key, value);
};

 
const rangeOfNumbers = range(5, 10);
print('Range of numbers:', rangeOfNumbers);

const loggedObj = logger({ name: 'John', age: 30 });
print(loggedObj.name);

fetchData('https://jsonplaceholder.typicode.com/posts/1').then(data => print('Data:', data));

const fibSeq = fibonacci(6);
print('Fibonacci sequence:', [...fibSeq]);

showMessage('Alice', 3);

logAndSet('language', 'JavaScript', (key, value) => console.log(`Callback for