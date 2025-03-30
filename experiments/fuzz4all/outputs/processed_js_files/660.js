 
class SecretKeeper {
    #secret;

    constructor(secret) {
        this.#secret = secret;
    }

    #revealSecret() {
        return `The secret is: ${this.#secret}`;
    }

    shareSecret() {
        return this.#revealSecret();
    }
}

 
const targetObj = new SecretKeeper("JavaScript is awesome!");
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            print(`Accessing property: ${prop}`);
            return obj[prop];
        } else {
            print(`Property ${prop} does not exist`);
        }
    }
};

const proxyObj = new Proxy(targetObj, handler);

 
const complexKey = { key: "value" };
const map = new Map();
map.set(complexKey, "Complex Key Value");

 
function* promiseGenerator() {
    yield new Promise(resolve => setTimeout(() => resolve('First Promise Resolved'), 1000));
    yield new Promise(resolve => setTimeout(() => resolve('Second Promise Resolved'), 2000));
}

 
(async () => {
    for (const promise of promiseGenerator()) {
        print(await promise);
    }

    print(proxyObj.shareSecret());  
    print(`Complex key value: ${map.get(complexKey)}`);  
})();
