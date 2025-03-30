 
async function complexFunction(...numbers) {
    try {
         
        let [max, min] = [Math.max(...numbers), Math.min(...numbers)];

         
        let delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

         
        await delay(1000);
        const { result } = await new Promise((resolve) => {
            resolve({ result: max - min });
        });

         
        return numbers.map(num => num * result);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

 
function* generatorFunction() {
    yield 'Start';
    yield* complexFunction(5, 15, 10);
    yield 'End';
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} does not exist.`);
        }
    }
};

const proxy = new Proxy(generatorFunction(), handler);

(async () => {
    for (const value of proxy) {
        if (typeof value.then === 'function') {
            print(await value);
        } else {
            print(value);
        }
    }
})();
