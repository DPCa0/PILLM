 

 
function* timeCounter() {
    let count = 0;
    while (true) {
        yield new Promise(resolve => setTimeout(() => resolve(count++), 1000));
    }
}

 
const handler = {
    get: function(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}":`, target[prop]);
            return target[prop];
        }
        console.warn(`Property "${prop}" does not exist!`);
        return undefined;
    }
};

const counter = { currentTime: 0 };
const proxyCounter = new Proxy(counter, handler);

 
async function runCounter() {
    const generator = timeCounter();
    for await (let value of generator) {
        proxyCounter.currentTime = value;
        print(`Counter updated: ${proxyCounter.currentTime}`);
         
        if (value >= 5) break;
    }
}

 
(async () => {
    print("Starting the time counter...");
    await runCounter();
    print("Time counter stopped.");
})();
