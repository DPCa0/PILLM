 
const handler = {
    get: (target, prop, receiver) => {
        if (prop in target) {
            print(`Getting ${prop}: ${target[prop]}`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new ReferenceError(`Property "${prop}" not found.`);
        }
    },
    set: (target, prop, value, receiver) => {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const person = new Proxy({ name: 'Alice', age: 30 }, handler);

 
try {
    print(person.name);
    person.age = 31;
    print(person.age);
    print(person.nonExistentProp);  
} catch (error) {
    console.error(error.message);
}

 
const uniqueKey = Symbol('unique');
person[uniqueKey] = 'UniqueValue';

print(`Unique property value: ${person[uniqueKey]}`);

 
const asyncFunction = async () => {
    const simulateAsyncTask = () => new Promise(resolve => setTimeout(() => resolve('Async Task Complete'), 2000));

    print('Starting async function...');
    const result = await simulateAsyncTask();
    print(result);
};

asyncFunction().then(() => print('All done!'));

 
function* fibonacci(limit) {
    let a = 0, b = 1;
    for (let i = 0; i < limit; i++) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
print('Fibonacci sequence:');
for (let number of fibonacci(5)) {
    print(number);
}

 
const [first, second, ...rest] = [10, 20, 30, 40, 50];
print(`First: ${first}, Second: ${second}, Rest: ${rest.join(', ')}`);

const originalObj = { a: 1, b: 2, c: 3 };
const { a, ...restProps } = originalObj;
console.log(`A: ${a}, RestProps: