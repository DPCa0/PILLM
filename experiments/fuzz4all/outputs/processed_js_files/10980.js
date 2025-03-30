 

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.warn(`Property ${property} does not exist`);
        }
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
    }
};

const person = {
    name: "Alice",
    age: 25
};

const proxyPerson = new Proxy(person, handler);
proxyPerson.name;   
proxyPerson.age = 26;  

 
const uniqueKey = Symbol('uniqueKey');
const obj = {
    [uniqueKey]: 'This is a unique value'
};
print(obj[uniqueKey]);  

 
function* numberGenerator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const gen = numberGenerator();
print(gen.next().value);  
print(gen.next().value);  

 
const [first, ...rest] = [10, 20, 30, 40];
print(first);  
print(rest);   

const array1 = [1, 2, 3];
const array2 = [4, 5, 6];
const combinedArray = [...array1, ...array2];
print(combinedArray);  

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
