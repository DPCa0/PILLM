 

 
function* generatePrimes(limit) {
    let num = 2;
    while (num <= limit) {
        if (isPrime(num)) yield num;
        num++;
    }

    function isPrime(n) {
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return n > 1;
    }
}

 
async function fetchData(url) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Fetched data from ${url}`);
        }, 1000);
    });
}

 
const config = {
    apiUrl: 'https://api.example.com/data',
    maxPrime: 10
};

const { apiUrl, maxPrime } = config;

 
(async () => {
    const primesGenerator = generatePrimes(maxPrime);
    const primes = [...primesGenerator];  
    print('Generated primes:', primes);

    try {
        const data = await fetchData(apiUrl);
        print(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
