 

 
function randomTimeout() {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 3000) + 1000;
        setTimeout(() => resolve(`Resolved after ${delay}ms`), delay);
    });
}

 
async function runTasks(tasks) {
    const results = [];
    for (const task of tasks) {
        results.push(await task());
    }
    return results;
}

 
const handler = {
    get: (target, property) => {
        if (typeof property === 'symbol' || !isNaN(property)) {
            print(`Accessing result[${property}]`);
        }
        return target[property];
    }
};

 
const uniqueSymbol = Symbol('unique');

 
(async function main() {
    const tasks = [randomTimeout, randomTimeout, randomTimeout];
    const results = await runTasks(tasks);
    
     
    const proxyResults = new Proxy(results, handler);

     
    print(proxyResults[0]);
    print(proxyResults[1]);
    print(proxyResults[2]);

     
    const obj = {
        [uniqueSymbol]: 'Unique Value',
        normalKey: 'Normal Value'
    };
    
     
    print(obj[uniqueSymbol]);
    print(obj.normalKey);
})();
