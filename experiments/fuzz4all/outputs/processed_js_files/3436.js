 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting property ${prop}`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const person = new Proxy({ name: 'Alice', age: 25 }, handler);
print(person.name);  
person.age = 26;  

 
function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const numbers = [...numberGenerator()];
const [first, ...rest] = numbers;
print(first, rest);  

 
const uniqueValues = new Set([1, 2, 3, 2, 1]);
print(Array.from(uniqueValues));  

 
class Counter {
    static count = 0;
    #privateField = 'I am private';

    increment() {
        Counter.count++;
        print(this.#privateField);
    }

    static getCount() {
        return Counter.count;
    }
}

const counter = new Counter();
counter.increment();  
print(Counter.getCount());  

 
function tag(strings, ...values) {
    print(strings);
    print(values);
    return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '');
}

const name = "Bob";
const message = tag`Hello, ${name}! Welcome to ${'JavaScript'}.`;
print(message);
