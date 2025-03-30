 

 
async function fetchData() {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(["apple", "banana", "cherry"]);
        }, 1000);
    });
}

 
function* fruitGenerator(fruits) {
    for (const fruit of fruits) {
        yield fruit;
    }
}

 
const fruitHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property "${prop}": ${target[prop]}`);
            return target[prop];
        }
        print(`Property "${prop}" does not exist.`);
        return undefined;
    }
};

 
const hiddenProperty = Symbol("hidden");

 
(async function main() {
    try {
        const fruits = await fetchData();
        const proxyFruits = new Proxy(fruits, fruitHandler);

         
        proxyFruits[hiddenProperty] = "This is hidden";

        const fruitGen = fruitGenerator(proxyFruits);

        for (const fruit of fruitGen) {
            print(`Fruit: ${fruit}`);
        }

        print(proxyFruits[hiddenProperty]);  
    } catch (error) {
        console.error(`Error: ${error}`);
    }
})();
