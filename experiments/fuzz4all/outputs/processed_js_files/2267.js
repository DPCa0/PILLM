 

 
function delayedResult(result, ms) {
    return new Promise(resolve => setTimeout(() => resolve(result), ms));
}

 
async function fetchDataInSequence(genFunc) {
    const iterator = genFunc();
    let iteration = iterator.next();
    
    while (!iteration.done) {
        try {
            const result = await iteration.value;  
            print(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        iteration = iterator.next();
    }
}

 
function* fetchSequenceGenerator() {
    yield delayedResult("Fetching data 1", 1000);
    yield delayedResult("Fetching data 2", 2000);
    yield delayedResult("Fetching data 3", 3000);
}

 
const loggingHandler = {
    apply: function(target, thisArg, argumentsList) {
        print(`Called with args: ${argumentsList}`);
        return target.apply(thisArg, argumentsList);
    }
};

const proxiedFetchDataInSequence = new Proxy(fetchDataInSequence, loggingHandler);

 
proxiedFetchDataInSequence(fetchSequenceGenerator);
