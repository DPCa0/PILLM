 

 
function* generateAsyncOperations() {
    yield new Promise(resolve => setTimeout(() => resolve("Result 1"), 1000));
    yield new Promise(resolve => setTimeout(() => resolve("Result 2"), 1000));
    yield new Promise(resolve => setTimeout(() => resolve("Result 3"), 1000));
}

 
async function executeAsyncGenerator(genFunc) {
    const iterator = genFunc();
    for await (const promise of iterator) {
        print(promise);
    }
}

 
const functionHandler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Calling function with args: ${argumentsList}`);
        return target.apply(thisArg, argumentsList) * 2;  
    }
};

function sum(a, b) {
    return a + b;
}

const proxiedSum = new Proxy(sum, functionHandler);

 
print(proxiedSum(10, 5));  

 
executeAsyncGenerator(generateAsyncOperations);
