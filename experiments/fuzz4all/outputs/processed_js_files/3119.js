 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const targetObject = { name: "Alice", age: 30 };
const proxy = new Proxy(targetObject, handler);

 
const uniqueProperty = Symbol('unique');

 
async function* fetchUserData() {
    yield await new Promise(resolve => setTimeout(() => resolve("Data chunk 1"), 1000));
    yield await new Promise(resolve => setTimeout(() => resolve("Data chunk 2"), 1000));
}

 
proxy.name = "Bob";
const { name, age } = proxy;

 
proxy[uniqueProperty] = "Unique Value";
print(proxy[uniqueProperty]);

 
(async () => {
    for await (const data of fetchUserData()) {
        print(data);
    }
})();

 
const numbers = [1, 2, 3, 4, 5];
const result = numbers.flatMap(num => [num, num * 2])
                       .filter(num => num > 5)
                       .reduce((acc, cur) => acc + cur, 0);
print(`Result of complex operations: ${result}`);
