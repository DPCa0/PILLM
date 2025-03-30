 

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property '${prop}'`);
            return Reflect.get(target, prop);
        } else {
            print(`Property '${prop}' doesn't exist`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
    }
};

// Create a target object to be proxied
const targetObject = { name: "Alice", age: 30 };

// Create a proxy object
const proxyObject = new Proxy(targetObject, handler);

// Async function that uses a generator
async function* fetchData() {
    const dataSources = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2"
    ];

    for (const url of dataSources) {
        const response = await fetch(url);
        const data = await response.json();
        yield data;
    }
}

// IIFE to consume the async generator
(async () => {
    for await (const data of fetchData()) {
        print("Fetched data:", data);
    }
})();

// Interact with the proxy object
print(proxyObject.name); // Getting property 'name'
proxyObject.age = 31; // Setting property 'age' to '31'
print(proxyObject.age); // Getting property 'age'
