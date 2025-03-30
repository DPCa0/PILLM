 
function tagged(template, ...substitutions) {
    return template.reduce((prev, current, i) => {
        return `${prev}${substitutions[i - 1]()}${current}`;
    });
}

 
const dynamicPropsHandler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} is not defined.`;
        }
    }
};

 
const logger = {
    apply: function(target, thisArg, args) {
        print(`Called ${target.name} with arguments: ${JSON.stringify(args)}`);
        return target.apply(thisArg, args);
    }
};

 
function* fibonacci(n) {
    let [a, b] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const person = new Proxy({
    name: 'John Doe',
    age: 30,
    greet: function() {
        return tagged`Hello, my name is ${() => this.name} and I am ${() => this.age} years old.`;
    }
}, dynamicPropsHandler);

 
const getFibonacci = new Proxy((n) => {
    return [...fibonacci(n)];
}, logger);

 
print(person.greet());
print(`Address: ${person.address}`);  
print(`Fibonacci sequence (10): ${getFibonacci(10)}`);
