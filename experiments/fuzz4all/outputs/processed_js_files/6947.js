 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching data failed:', error);
        return null;
    }
}

 
function* fibonacciSequence() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
let targetObject = {
    a: 1,
    b: 2,
    c: 3
};

let proxy = new Proxy(targetObject, {
    get(target, prop) {
        print(`Accessing property '${prop}':`, target[prop]);
        return Reflect.get(target, prop);
    }
});

 
let fibMap = new Map();
const fibGen = fibonacciSequence();

for (let i = 0; i < 10; i++) {
    fibMap.set(i, fibGen.next().value);
}

 
let numberArray = [1, 2, 2, 3, 4, 5, 5, 5, 6];
let uniqueNumbers = new Set(numberArray);

 
class MathOperations {
    static sum(...numbers) {
        return numbers.reduce((acc, num) => acc + num, 0);
    }

    multiply(...numbers) {
        return numbers.reduce((acc, num) => acc * num, 1);
    }
}

 
(async () => {
    print('Fetching JSON Placeholder data...');
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    
    print('Data:', data ? data.slice(0, 3) : 'No data available');
    
    print('First 10 Fibonacci numbers:');
    fibMap.forEach((value, key) => print(`Fib(${key}) = ${value}`));
    
    print('Unique numbers from array:', [...uniqueNumbers]);