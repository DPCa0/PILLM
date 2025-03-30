 
const multiply = (factor, ...numbers) => numbers.map(n => n * factor);

 
const createValidatedArray = () => new Proxy([], {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.error(`Property ${property} does not exist.`);
        }
    },
    set(target, property, value) {
        if (typeof value === 'number') {
            print(`Setting ${property} to ${value}`);
            target[property] = value;
            return true;
        } else {
            console.error(`Property ${property} must be a number.`);
            return false;
        }
    }
});

 
(async () => {
    const fetchData = async (url) => {
        const response = await fetch(url);
        return await response.json();
    };

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched data:', data);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
})();

 
const user = { name: 'Alice', age: 30 };
const greet = ({ name, age }) => `Hello, ${name}. You are ${age} years old.`;
print(greet(user));

 
let numbers = createValidatedArray();
numbers.push(...multiply(2, 1, 2, 3));  

 
const uniqueKey = Symbol('unique');
numbers[uniqueKey] = 42;
print('Unique Key Value:', numbers[uniqueKey]);

 
let uniqueNumbers = new Set([...numbers, 6, 2, 3]);
print('Unique Numbers Set:', [...uniqueNumbers]);

 
let evenSum = [...uniqueNumbers].filter(n => n % 2 === 0).reduce((acc, n) => acc + n, 0);
print('Sum of Even Numbers:', evenSum);
