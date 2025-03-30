 

 
const handler = {
    get: function(target, property) {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    }
};

const targetObject = { a: 1, b: 2, c: 3 };
const proxy = new Proxy(targetObject, handler);

 
function* promiseGenerator(dataArray) {
    for (const data of dataArray) {
        yield new Promise(resolve => setTimeout(() => resolve(data), 1000));
    }
}

 
async function processPromises(generator) {
    for (const promise of generator) {
        const result = await promise;
        print(`Processed: ${result}`);
    }
}

 
(async function main() {
    print('Starting advanced JavaScript program...');

     
    print(`Accessing property 'a': ${proxy.a}`);
    print(`Accessing property 'b': ${proxy.b}`);

     
    const dataArray = [10, 20, 30];
    const generator = promiseGenerator(dataArray);
    await processPromises(generator);

    print('Program complete.');
})();
