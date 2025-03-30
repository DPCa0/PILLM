 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function createGreeter(greeting) {
    return function(name) {
        print(`${greeting}, ${name}!`);
    };
}

 
const fibonacci = {
    [Symbol.iterator]: function() {
        let prev = 0, curr = 1;
        return {
            next() {
                [prev, curr] = [curr, prev + curr];
                return { value: curr, done: false };
            }
        };
    }
};

 
const user = {
    name: "Alice",
    age: 30
};

const userProxy = new Proxy(user, {
    get(target, property) {
        print(`Getting property: ${property}`);
        return target[property];
    }
});

 
async function* asyncGenerator() {
    await delay(1000);
    yield 'Hello';
    await delay(1000);
    yield 'World';
}

 
(async () => {
     
    const greet = createGreeter('Hello');
    greet('World');

     
    print(userProxy.name);

     
    const fib = fibonacci[Symbol.iterator]();
    print(fib.next().value);  
    print(fib.next().value);  
    print(fib.next().value);  

     
    for await (const word of asyncGenerator()) {
        print(word);
    }
})();
