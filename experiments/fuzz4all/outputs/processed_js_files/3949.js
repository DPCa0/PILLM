 
const MyComplexModule = (function() {
     
    let secret = "This is a secret";

    function privateFunction() {
        print("Accessing private function");
    }

     
    return {
        revealSecret: function() {
            print(secret);
        },
        callPrivateFunction: function() {
            privateFunction();
        }
    };
})();

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

 
const person = {
    name: "Alice",
    age: 25
};

const personProxy = new Proxy(person, {
    get(target, property) {
        print(`Property '${property}' accessed`);
        return target[property];
    },
    set(target, property, value) {
        print(`Property '${property}' set to '${value}'`);
        target[property] = value;
        return true;
    }
});

 
function greet({ name = "Guest", greeting = "Hello" }) {
    print(`${greeting}, ${name}!`);
}

 
(async function() {
    if (true) {   
        const module = await import('./dynamicModule.js');
        module.dynamicFeature();
    }

    const uniqueValues = new Set([1, 2, 3, 4, 5]);
    for await (const value of uniqueValues) {
        print(`Async iterating value: ${value}`);
    }
})();

 
MyComplexModule.revealSecret();
MyComplexModule.callPrivateFunction();

fetchData('https://jsonplaceholder.typicode.com/todos/1');

print(personProxy.name);
personProxy.age = 30;

greet({ name: "Bob", greeting: "Hi" });
