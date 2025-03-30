 

 
function* asyncGenerator() {
    yield delay(1000, 'First delay complete');
    yield delay(1500, 'Second delay complete');
    yield delay(500, 'Third delay complete');
}

 
function delay(ms, message) {
    return new Promise(resolve => setTimeout(() => resolve(message), ms));
}

 
async function processAsyncGenerator(gen) {
    const resultsMap = new Map();
    for await (let promise of gen) {
        const result = await promise;
        resultsMap.set(Date.now(), result);
        print(result);
    }
    print('All tasks completed, results stored in Map:', resultsMap);
}

 
const handler = {
    get(target, prop) {
        if (target.has(prop)) {
            print(`Accessing result with key: ${prop}`);
            return target.get(prop);
        } else {
            print(`Key: ${prop} does not exist`);
            return undefined;
        }
    }
};

 
const gen = asyncGenerator();
processAsyncGenerator(gen).then(() => {
    const results = new Map([
        [1, 'First Result'],
        [2, 'Second Result'],
        [3, 'Third Result']
    ]);
    const proxiedResults = new Proxy(results, handler);
    print(proxiedResults.get(1));  
    print(proxiedResults.get(4));  
});
