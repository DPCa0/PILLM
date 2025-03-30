 
class Fibonacci {
    constructor(limit) {
        this.limit = limit;
    }
    [Symbol.iterator]() {
        let a = 0, b = 1, count = 0, limit = this.limit;
        return {
            next() {
                if (count++ >= limit) return { done: true };
                [a, b] = [b, a + b];
                return { value: a, done: false };
            }
        };
    }
}

 
async function fetchData(url) {
    return new Promise(resolve => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
}

 
async function getAllData(urls) {
    try {
        const promises = urls.map(url => fetchData(url));
        const results = await Promise.all(promises);
        results.forEach(result => print(result));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
function* oddNumbers(limit) {
    for (let i = 1; i <= limit; i += 2) {
        yield i;
    }
}

 
const person = {
    name: 'Alice',
    age: 25
};

const handler = {
    get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} not found`;
    },
    set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[prop] = value;
        return true;
    }
};

const personProxy = new Proxy(person, handler);

 
print('--- Fibonacci Sequence ---');
for (let num of new Fibonacci(10)) {
    print(num);
}

print('--- Fetch Data ---');
getAllData(['url1', 'url2', 'url3']);

print('--- Odd Numbers ---');
for (let num of oddNumbers(10)) {
    print(num);
}

print('--- Proxy Example ---');
print(personProxy.name);  
print(personProxy.age);   
print(personProxy.gender);  
try {
    personProxy.age = 'thirty';   