 

 
const secretSymbol = Symbol('secret');

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const generatorHandler = {
    get(target, property) {
        if (property === secretSymbol) {
            return "You found the secret!";
        }
        return target[property]();
    }
};

 
const idGen = idGenerator();

 
const proxiedGenerator = new Proxy(idGen, generatorHandler);

 
async function fetchIds(proxiedGen, count) {
    const ids = [];
    for (let i = 0; i < count; i++) {
        const id = await new Promise(resolve => setTimeout(() => resolve(proxiedGen.next().value), 500));
        ids.push(id);
        print(`Fetched ID: ${id}`);
    }
    return ids;
}

 
fetchIds(proxiedGenerator, 5).then(ids => {
    print("Fetched all IDs:", ids);
    print(proxiedGenerator[secretSymbol]);  
});
