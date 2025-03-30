 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* asyncNumberGenerator() {
    let i = 1;
    while (i <= 5) {
        await delay(1000);
        yield i++;
    }
}

 
const loggerHandler = {
    get: (target, prop) => {
        print(`Getting ${prop} from target`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting ${prop} to ${value} on target`);
        target[prop] = value;
        return true;
    }
};

 
let data = { message: "Hello, world!" };
const proxyData = new Proxy(data, loggerHandler);

 
(async function() {
    proxyData.message = "Processing started.";
    print(proxyData.message);

    const generator = asyncNumberGenerator();
    for await (const num of generator) {
        print(`Generated number: ${num}`);
    }

    proxyData.message = "Processing finished.";
    print(proxyData.message);
})();
