 
async function* asyncRange(start, end) {
    for (let i = start; i <= end; i++) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

 
const handler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const obj = new Proxy({}, handler);
obj.a = 10;
print(obj.a);

 
let user = { profile: null };
print(user?.profile?.name ?? "Default Name");

 
function numberParser(strings, ...expressions) {
    return expressions.map(expr => parseFloat(expr)).reduce((a, b) => a + b, 0);
}

let result = numberParser`The sum is ${"4.2"} and ${"2.8"}`;
print(`Result: ${result}`);

 
(async () => {
    for await (let num of asyncRange(1, 5)) {
        print(num);
    }
})();

 
class Person {
    #name;
    constructor(name) {
        this.#name = name;
    }
    greet() {
        print(`Hello, ${this.#name}!`);
    }
}

const john = new Person('John');
john.greet();
