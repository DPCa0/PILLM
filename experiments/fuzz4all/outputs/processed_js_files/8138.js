 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* fibonacciAsync(max) {
    let [prev, curr] = [0, 1];
    while (curr <= max) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
        await delay(500);  
    }
}

 
const logAccessHandler = {
    get: (target, prop, receiver) => {
        print(`Accessing ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const config = new Proxy({
    apiEndpoint: 'https://api.example.com',
    timeout: 5000
}, logAccessHandler);

 
(async () => {
    print('Fetching configuration...');
    print(`API Endpoint: ${config.apiEndpoint}`);
    
    print('Starting Fibonacci sequence:');
    const maxFib = 50;
    for await (const num of fibonacciAsync(maxFib)) {
        print(num);
    }
})();
