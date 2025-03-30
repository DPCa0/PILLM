 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property: ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`Property ${prop} not found`);
        }
    },
    set(target, prop, value) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const complexObject = new Proxy({a: 1, b: 2, c: 3}, handler);

 
async function performComplexCalculation(obj) {
    print('Performing complex calculation...');
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = obj.a + obj.b + obj.c;
            print(`Calculation result: ${result}`);
            resolve(result);
        }, 2000);
    });
}

 
const uniqueNumbers = new Set([1, 2, 3, 4, 5]);

 
const calculationCache = new WeakMap();

(async () => {
     
    complexObject.a = 5;
    
     
    const promises = Array.from(uniqueNumbers).map(async (num) => {
        if (calculationCache.has(num)) {
            print(`Fetching cached result for ${num}`);
            return calculationCache.get(num);
        } else {
            complexObject.a = num;
            const result = await performComplexCalculation(complexObject);
            calculationCache.set(num, result);
            return result;
        }
    });

    const results = await Promise.all(promises);
    print('Final Results:', results);
})();
