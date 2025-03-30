 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new CustomError(`Failed to fetch: ${response.status}`);
        
        let data = await response.json();
        let { title, body } = data;

        print(`Title: ${title}`);
        print(`Body: ${body}`);
    } catch (error) {
        if (error instanceof CustomError) {
            console.error(`Custom Error: ${error.message}`);
        } else {
            console.error(`Unexpected Error: ${error}`);
        }
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Property accessed: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

let targetObject = { foo: "bar" };
let proxy = new Proxy(targetObject, handler);

 
function* idGenerator(start = 0) {
    let id = start;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();
proxy.foo = idGen.next().value;
print(`Generated ID: ${proxy.foo}`);

fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
function tag(strings, ...values) {
    print("Tagged Template Strings: ", strings);
    print("Tagged Template Values: ", values);
}

const name = "World";
tag`Hello, ${name}! Welcome to advanced JavaScript.`;
