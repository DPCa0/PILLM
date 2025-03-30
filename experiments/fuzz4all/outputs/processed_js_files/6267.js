 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return target[prop];
        } else {
            throw new ReferenceError(`Property "${prop}" does not exist.`);
        }
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const target = {
    name: "Advanced JavaScript",
    version: "ES6+"
};

const proxy = new Proxy(target, handler);

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data = await response.json();
        print("Fetched Data:", data);
    } catch (error) {
        console.error("Fetch Error:", error);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const user = {
    username: "coder123",
    email: "coder@example.com",
    preferences: {
        theme: "dark",
        notifications: true
    }
};

const { username, ...rest } = user;
print("Username:", username);
print("Rest:", rest);

 
const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        yield "Hello";
        yield "Async";
        yield "Iteration";
    }
};

 
(async () => {
    proxy.name = "JavaScript Advanced Features";
    print(proxy.name);
     
     
    const gen = idGenerator();
    print(gen.next().value);
    print(gen.next().value);
    print(gen.next().value);

    for await (const value of asyncIterable) {
        print(value);
    }
})();
