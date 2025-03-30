 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const loggerHandler = {
    get: (target, property) => {
        print(`Property '${property}' accessed.`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Property '${property}' set to ${value}.`);
        target[property] = value;
        return true;
    }
};

let user = new Proxy({ name: 'Alice', age: 25 }, loggerHandler);

 
function* valueGenerator() {
    yield* [1, 2, 3, 4, 5];
}

const asyncIterateWithDelay = async (gen) => {
    for (let value of gen) {
        await delay(500);  
        print(`Processed value: ${value}`);
    }
};

(async () => {
    print(`User name: ${user.name}`);  
    user.age = 26;  

    const generatorInstance = valueGenerator();
    await asyncIterateWithDelay(generatorInstance);
})();
