 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function processData() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(url);
    const fibGen = fibonacciGenerator();
    
    if (data) {
        print('Fetched Data:', data.slice(0, 3));  
        print('Fibonacci Numbers:');
        for (let i = 0; i < 5; i++) {
            print(fibGen.next().value);  
        }
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Property accessed: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

const target = { prop1: 'value1', prop2: 'value2' };
const proxy = new Proxy(target, handler);

print(proxy.prop1);  

 
processData();
