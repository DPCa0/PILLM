 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(url) {
    await delay(1000);  
    if (url !== 'https://api.example.com/data') throw new Error('Invalid URL');
    return { data: [1, 2, 3, 4, 5] };
}

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property '${prop}'`);
            return target[prop];
        } else {
            throw new Error(`Property '${prop}' does not exist`);
        }
    }
};

(async () => {
    const apiUrl = 'https://api.example.com/data';
    const { data: numbers } = await fetchData(apiUrl);
    
    const proxyData = new Proxy(numbers, handler);
    
    const sum = (...args) => args.reduce((acc, val) => acc + val, 0);
    const total = sum(...proxyData);
    
    print(`Sum of numbers from API is: ${total}`);
})();
