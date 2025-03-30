 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
function* numberGenerator(limit) {
    for (let i = 0; i <= limit; i++) {
        yield i;
    }
}

 
async function displayNumbers(limit) {
    const gen = numberGenerator(limit);
    for (let num of gen) {
        await delay(500);  
        print(num);
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting property ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const person = new Proxy({ name: "Alice", age: 25 }, handler);

 
print(person.name);
person.age = 26;

 
const squareMap = new Map([[1, 1], [2, 4], [3, 9]]);
const resultArray = Array.from(squareMap, ([key, value]) => `${key}: ${value}`);

print(resultArray);

 
(async () => {
    print("Starting number display...");
    await displayNumbers(5);
    print("Finished!");
})();
