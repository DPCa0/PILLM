 

 
const loggerHandler = {
    get: function(target, property) {
        print(`Property '${property}' accessed.`);
        return target[property];
    }
};

const data = { name: "Alice", age: 30 };
const proxyData = new Proxy(data, loggerHandler);

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => resolve(proxyData), 1000);
    });
}

 
(async () => {
     
    const { name, age } = await fetchData();
    print(`Fetched data: ${name}, ${age}`);

     
    const numGen = numberGenerator();
    print(`Generated numbers: ${numGen.next().value}, ${numGen.next().value}, ${numGen.next().value}`);
})();
