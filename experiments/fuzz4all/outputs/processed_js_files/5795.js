 

 
const fetchData = () => new Promise((resolve) => setTimeout(() => resolve("Data loaded!"), 1000));

 
function* dataGenerator() {
    yield fetchData();
    yield fetchData();
    yield fetchData();
}

 
const handler = {
    get(target, property) {
        print(`Accessed property "${property}"`);
        return target[property];
    },
    apply(target, thisArg, argumentsList) {
        print(`Called function with args: ${argumentsList}`);
        return target.apply(thisArg, argumentsList);
    }
};

 
async function processData(gen) {
    for (let promise of gen) {
        const data = await promise;
        print(data);
    }
}

 
const proxiedGenerator = new Proxy(dataGenerator, handler);
const generatorInstance = proxiedGenerator();

 
processData(generatorInstance);
