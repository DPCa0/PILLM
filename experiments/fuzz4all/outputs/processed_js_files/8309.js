 

 
import fetch from 'node-fetch';

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

         
        const { title, completed } = data;

         
        print(`Task: ${title}, Completed: ${completed}`);
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}

 
async function run() {
    const todos = [
        'https://jsonplaceholder.typicode.com/todos/1',
        'https://jsonplaceholder.typicode.com/todos/2'
    ];

     
    const promises = todos.map(todo => fetchData(todo));
    await Promise.all(promises);
}

 
function greetUser(user) {
    const name = user?.name ?? 'Guest';
    print(`Hello, ${name}!`);
}

 
const numbers = [1, 2, 3, 4, 5];
const doubledEvenNumbers = numbers
    .filter(num => num % 2 === 0)
    .map(num => num * 2);

print('Doubled Even Numbers:', doubledEvenNumbers);

 
(() => {
    const secretKey = Symbol('secret');

    const user = {
        name: 'John Doe',
        [secretKey]: '12345'
    };

    print(`User's secret key: ${user[secretKey]}`);
})();

// Using a Proxy to intercept operations
const person = {
    name: 'Alice',
    age: 30
};

const handler = {
    get: function(target, property) {
        return property in target ? target[property] : 'Property does not exist';
    }
};

const proxyPerson = new Proxy(person, handler);
print(proxyPerson.name); // Alice
print(proxyPerson.height); // Property does not exist

// Run the async function to fetch data
run();

// Greet user using optional chaining and nullish coalescing
greetUser({ name: 'Eve'