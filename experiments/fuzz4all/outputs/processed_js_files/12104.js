 

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const randomTimeoutPromise = (value) => new Promise((resolve) => {
    const timeout = Math.floor(Math.random() * 2000) + 500;
    setTimeout(() => resolve(value), timeout);
});

 
async function processRangeAsync(start, end) {
    let results = [];
    for await (const value of range(start, end)) {
        results.push(randomTimeoutPromise(value * value));   
    }
    return Promise.all(results);
}

 
const resultHandler = {
    get: (target, property) => {
        print(`Accessing property "${property}"`);
        return target[property];
    }
};

 
(async () => {
    try {
        print('Processing range...');
        const results = await processRangeAsync(1, 5);
        
        const proxiedResults = new Proxy(results, resultHandler);
        
        print('Results:', proxiedResults);
        print('Access example:', proxiedResults[0]);   
    } catch (error) {
        console.error('Error:', error);
    }
})();
