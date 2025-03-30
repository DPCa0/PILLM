 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* randomNumbersGenerator() {
    for (let i = 0; i < 10; i++) {
        yield Math.floor(Math.random() * 100);
    }
}

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        }
        return `Property ${property} does not exist`;
    },
    set: function(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const proxiedGenerator = new Proxy(randomNumbersGenerator(), handler);

 
async function asyncIterate(generator) {
    for await (const num of generator) {
        await delay(500);  
        print(`Generated number: ${num}`);
    }
}

 
const generatorObj = {};
generatorObj[Symbol.asyncIterator] = async function* () {
    const randomNums = randomNumbersGenerator();
    for (const num of randomNums) {
        await delay(300);
        yield num;
    }
};
const proxiedAsyncIter = new Proxy(generatorObj, handler);

(async () => {
    print("Asynchronous Iteration with Generator and Proxy:");
    await asyncIterate(proxiedAsyncIter);
})();
