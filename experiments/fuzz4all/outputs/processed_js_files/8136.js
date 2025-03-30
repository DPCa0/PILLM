 

 
const target = {
    message1: "hello",
    message2: "world"
};

const handler = {
    get: (obj, prop) => {
        print(`Getting property ${prop}`);
        return prop in obj ? obj[prop] : "default";
    },
    set: (obj, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Fetch error: ", error);
    }
};

const url = "https://jsonplaceholder.typicode.com/posts";
fetchData(url).then(data => print("Fetched data:", data.slice(0, 2)));

 
function* numberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        yield i;
    }
}

const numbers = [...numberGenerator(5)];
print("Generated numbers:", numbers);

 
const condition = true;
if (condition) {
    import('./someModule.js').then(module => {
        module.someFunction();
    }).catch(err => {
        console.error("Module load error:", err);
    });
}

 
const user = {
    firstName: "Jane",
    lastName: "Doe",
    age: 28,
    location: "USA"
};

const { firstName, lastName, ...rest } = user;
print(`User: ${firstName} ${lastName}, Other Info:`, rest);

 
class Example {
    constructor(name) {
        this.name = name;
    }
    sayHello() {
        print(`Hello, ${this.name}!`);
    }
}

const exampleInstance = Reflect.construct(Example, ['Alice']);
Reflect.apply(exampleInstance.sayHello, exampleInstance, []);

 
print(proxy.message1);  
proxy.message2