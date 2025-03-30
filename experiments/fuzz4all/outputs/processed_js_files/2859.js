 

 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

 
async function fetchNumber(timeout) {
    return new Promise(resolve => setTimeout(() => resolve(generator.next().value), timeout));
}

 
const generator = numberGenerator();

 
const fetchHandler = {
    apply: async function(target, thisArg, args) {
        const num = await Reflect.apply(target, thisArg, args);
        print(`Fetched number: ${num}`);
        return num;
    }
};

 
const proxiedFetchNumber = new Proxy(fetchNumber, fetchHandler);

 
(async function main() {
    const numbersToFetch = 5;
    const promises = Array.from({ length: numbersToFetch }, (_, i) => proxiedFetchNumber(100 * i));

     
    const results = await Promise.all(promises);
    print(`Fetched numbers: ${results.join(', ')}`);
})();
