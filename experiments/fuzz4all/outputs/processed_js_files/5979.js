 
function* primeGenerator(limit) {
    const isPrime = (num) => {
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return num > 1;
    };
    let num = 2;
    while (num <= limit) {
        if (isPrime(num)) yield num;
        num++;
    }
}

 
const primes = [...primeGenerator(100)];

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            print(`Property ${property} does not exist`);
        }
    },
    set: function(target, property, value) {
        print(`Setting ${property} to ${value}`);
        if (Number.isInteger(value)) {
            target[property] = value;
        } else {
            print(`Invalid value: ${value}`);
        }
    }
};

const proxiedPrimes = new Proxy(primes, handler);

 
print(proxiedPrimes[5]);   
proxiedPrimes[5] = 29;           
proxiedPrimes[5] = 'Hello';      

 
proxiedPrimes.push(101);
print(Reflect.has(proxiedPrimes, '7'));

 
const primeMap = new Map(primes.map((prime, index) => [prime, `Prime #${index + 1}`]));
print(primeMap.get(29));

 
const dynamicObject = {};
Object.defineProperties(dynamicObject, {
    currentDate: {
        get: function() {
            return new Date().toDateString();
        },
        enumerable: true
    },
    randomNum: {
        value: Math.random(),
        writable: true
    }
});

print(dynamicObject.currentDate);
print(dynamicObject.randomNum);
