 
async function* primeGenerator(limit) {
    let num = 2;
    while (limit > 0) {
        if (isPrime(num)) {
            yield num;
            limit--;
        }
        num++;
    }
}

 
const isPrime = (num) => {
    if (num < 2) return false;
    for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++) {
        if (num % i === 0) return false;
    }
    return true;
};

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property '${prop}' does not exist.`);
        }
    },
    set(target, prop, value) {
        if (typeof value === 'number') {
            target[prop] = value;
            return true;
        } else {
            console.error(`Value for '${prop}' must be a number.`);
            return false;
        }
    }
};

 
let map = new Map([["x", 1], ["y", 2]]);
let proxyMap = new Proxy(map, {
    get(target, prop) {
        return target.get(prop);
    },
    set(target, prop, value) {
        target.set(prop, value);
        return true;
    }
});

 
let weakSet = new WeakSet();
let obj = {};
weakSet.add(obj);

let weakMap = new WeakMap();
weakMap.set(obj, { data: "important" });

 
let array = [1, 2, 3];
let arrayProxy = new Proxy(array, handler);

 
(async () => {
    print("Prime numbers:");
    for await (const prime of primeGenerator(5)) {
        print(prime);
    }

    print("\nAccessing Proxy:");
    print(proxyMap.x);  
    proxyMap.z = 42;
    print(proxyMap.z);  

    print("\nAccessing Array through Proxy:");
    print(arrayProxy[1]);  
    arrayProxy