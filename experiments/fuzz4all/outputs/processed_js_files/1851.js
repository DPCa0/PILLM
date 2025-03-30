 
function* fibonacciGenerator() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const handler = {
    get: (obj, prop) => {
        if (prop in obj) {
            return obj[prop];
        }
        return `Property '${prop}' doesn't exist.`;
    },
    set: (obj, prop, value) => {
        if (typeof value === 'number') {
            obj[prop] = value;
            return true;
        } else {
            print(`Only numeric values are allowed for property '${prop}'`);
            return false;
        }
    }
};

// Create a proxy object
let numbers = new Proxy({}, handler);

// Define an async function to fetch data from an API
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        print("Fetch error: " + error.message);
    }
}

// Immediate Invoked Function Expression (IIFE) with async/await and generator
(async () => {
    const fibGen = fibonacciGenerator();
    const fibSequence = Array.from({ length: 5 }, () => fibGen.next().value);

    // Fetch example JSON data
    const dataUrl = 'https: 
    const data = await fetchData(dataUrl);

     
    const [a, b, c] = fibSequence;
    print(`First three Fibonacci numbers are: ${a}, ${b}, and ${c}`);
    print(`Fibonacci sequence generated: ${fibSequence.join(', ')}`);
    
     
    numbers.a = 42;
    numbers.b = 'not a number';  
    print(`Value of 'a' in Proxy object: ${numbers.a}`);
    print(`Value of 'b' in Proxy object: ${numbers.b}`);  
})();
