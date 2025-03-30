 
async function* generatePrimes() {
    function isPrime(num) {
        for (let i = 2, sqrt = Math.sqrt(num); i <= sqrt; i++)
            if (num % i === 0) return false;
        return num > 1;
    }

    let num = 2;
    while (true) {
        if (isPrime(num)) yield num;
        num++;
    }
}

 
const primeCharacteristics = new Map();
const handler = {
    get: function(target, prop) {
        print(`Accessing ${prop}`);
        return target[prop];
    },
    set: function(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};
const proxyCharacteristics = new Proxy(primeCharacteristics, handler);

 
(async () => {
    const primes = generatePrimes();
    const primeArray = [];

    for await (let prime of primes) {
         
        proxyCharacteristics.set(prime, primeArray.length);
        primeArray.push(prime);

         
        if (primeArray.length >= 10) break;
    }

     
    const [firstPrime, ...otherPrimes] = primeArray;
    print(`First prime: ${firstPrime}`);
    print(`Other primes: ${otherPrimes}`);

     
    function highlight(strings, ...values) {
        return strings.raw.reduce((acc, str, i) => `${acc}<b>${str}</b>${values[i] || ''}`, '');
    }
    print(highlight`Generated Primes: ${primeArray.join(', ')}`);
})();
