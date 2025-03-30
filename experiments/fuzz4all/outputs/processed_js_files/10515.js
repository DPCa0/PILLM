 

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting property: ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} doesn't exist.`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const targetObject = { name: 'Alice', age: 25 };
const proxy = new Proxy(targetObject, handler);

// Async function using Promises and Proxy
async function performOperations() {
    // Dynamic import example
    const { default: fetch } = await import('node-fetch');
    
    // Fetch data from an API
    try {
        const response = await fetch('https: 
        const data = await response.json();
        print('Data fetched:', data);

         
        proxy.title = data.title;   
        print(proxy.title);   
    } catch (error) {
        print('Error fetching data:', error);
    }
}

 
const greeting = (name) => `Hello, ${name}! Welcome to advanced JavaScript.`;

print(greeting('Alice'));
performOperations();
