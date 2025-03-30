 

 
function* fetchDataGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve({ name: "Alice", age: 30 }), 1000));
    yield new Promise(resolve => setTimeout(() => resolve({ name: "Bob", age: 25 }), 1000));
}

 
async function processData(gen) {
    let results = [];
    for (let promise of gen) {
        const data = await promise;
        results.push(data);
    }
    return results;
}

 
const handler = {
    get: function (target, prop) {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

 
(async () => {
    const dataGen = fetchDataGenerator();
    const rawData = await processData(dataGen);
    
     
    for (const { name, age } of rawData) {
        const person = new Proxy({ name, age }, handler);
        print(`${person.name} is ${person.age} years old.`);
    }
})();
