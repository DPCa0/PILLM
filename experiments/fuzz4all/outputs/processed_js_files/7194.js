 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function delayedHello(name) {
    await delay(1000);
    print(`Hello, ${name}!`);
}

 
const handler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Called with arguments: ${argumentsList}`);
        return target.apply(thisArg, argumentsList);
    }
};

const proxiedDelayedHello = new Proxy(delayedHello, handler);

 
const greetings = new Map();

async function greet(name) {
    if (!greetings.has(name)) {
        greetings.set(name, false);
    }
    if (!greetings.get(name)) {
        await proxiedDelayedHello(name);
        greetings.set(name, true);
    }
}

 
const names = ['Alice', 'Bob', 'Charlie'];
Promise.all(names.map(name => greet(name)))
    .then(() => print('All greetings done!'));

 
function* greetingGenerator(names) {
    for (const name of names) {
        yield `Greetings, ${name}`;
    }
}

const gen = greetingGenerator(names);
for (const greeting of gen) {
    print(greeting);
}
