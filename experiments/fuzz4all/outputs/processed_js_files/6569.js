 
async function* primeGenerator(limit) {
    const isPrime = (num) => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return num > 1;
    };

    let count = 0;
    let num = 2;
    while (count < limit) {
        if (isPrime(num)) {
            yield num;
            count++;
        }
        num++;
    }
}

 
const handler = {
    get: function(target, prop) {
        print(`Accessing property '${prop}'`);
        return prop in target ? target[prop] : undefined;
    }
};

const complexObject = new Proxy({
    name: "Advanced JS",
    version: "ES2023",
    features: ["Async Generators", "Proxies", "Promises", "Symbols"]
}, handler);

 
const UNIQUE_KEY = Symbol('unique');

 
class FeatureManager {
    #features = new Set();

    addFeature(feature) {
        if (!this.#features.has(feature)) {
            this.#features.add(feature);
            print(`Feature added: ${feature}`);
        }
    }

    [UNIQUE_KEY]() {
        return `Features: ${[...this.#features].join(', ')}`;
    }
}

 
(async () => {
    const featureManager = new FeatureManager();

    for await (const prime of primeGenerator(5)) {
        featureManager.addFeature(`Prime Number - ${prime}`);
    }

    print(complexObject.name);
    print(complexObject.unknownProperty);  
    print(complexObject.features);

    print(featureManager[UNIQUE_KEY]());
})();
