 
function* primeGenerator(limit) {
    let num = 2;
    const isPrime = (n) => {
        for (let i = 2, sqrt = Math.sqrt(n); i <= sqrt; i++) {
            if (n % i === 0) return false;
        }
        return true;
    };
    while (num <= limit) {
        if (isPrime(num)) yield num;
        num++;
    }
}

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
}

 
const handler = {
    get(target, property) {
        print(`Property '${property}' accessed`);
        return target[property];
    }
};

 
const primeNumbers = { firstTen: Array.from(primeGenerator(29)) };
const primeProxy = new Proxy(primeNumbers, handler);

 
(async () => {
    try {
         
        const data = await fetchData('https://api.example.com/data');
        print('Fetched Data:', data);

         
        print('First Ten Primes:', primeProxy.firstTen);

         
        const { firstTen } = primeProxy;
        const [first, ...rest] = firstTen;
        print('First Prime:', first);
        print('Rest of Primes:', rest);
    } catch (error) {
        console.error('Error:', error);
    }
})();
