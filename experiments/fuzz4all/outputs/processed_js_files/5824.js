class AsyncStream {
    constructor() {
        this.listeners = [];
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
    }
    
    next(value) {
        this.listeners.forEach(listener => listener(value));
    }
}

const range = async function* (start, end) {
    for (let i = start; i <= end; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        yield i;
    }
};

const asyncStream = new AsyncStream();

asyncStream.subscribe(value => {
    print(`Received: ${value}`);
});

(async () => {
    for await (const number of range(1, 5)) {
        asyncStream.next(number);
    }

    async function fetchSimulatedData(url) {
        const response = await new Promise(resolve => 
            setTimeout(() => resolve({ json: () => ({ data: `Fetched from ${url}` }) }), 200)
        );
        const data = await response.json();
        print(data);
    }

    await Promise.all([
        fetchSimulatedData('https://api.example.com/resource1'),
        fetchSimulatedData('https://api.example.com/resource2')
    ]);
})();
