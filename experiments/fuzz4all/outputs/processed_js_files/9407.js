 

const asyncDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* delayGenerator(...delays) {
    for (const delay of delays) {
        yield asyncDelay(delay);
    }
}

 
const generatorHandler = {
    get: (target, property) => {
        if (property === 'next') {
            return (...args) => {
                const { value, done } = target.next(...args);
                return done ? { value, done } : { value: value.then(() => `${delayIndex++}ms delay finished`), done };
            };
        }
        return target[property];
    }
};

let delayIndex = 1;
const proxyGenerator = new Proxy(delayGenerator(1000, 2000, 3000), generatorHandler);

 
async function processDelays(gen) {
    const results = [];
    for (let result = await gen.next(); !result.done; result = await gen.next()) {
        results.push(result.value);
    }
    return results;
}

 
(async function main() {
    const results = await Promise.all([
        processDelays(proxyGenerator),
        (async function() {
            await asyncDelay(1500);
            return 'Independent async operation finished';
        })()
    ]);

    print('Results:', results.flat());
})();
