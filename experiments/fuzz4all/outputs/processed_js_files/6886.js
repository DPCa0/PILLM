 
const sumOfSquares = (...nums) => nums.reduce((sum, num) => sum + num ** 2, 0);

 
async function fetchAndProcessData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        
         
        const { id, value } = data;
        print(`Data ID: ${id}, Value: ${value}`);
        
         
        const processedData = Object.entries(data).map(([key, val]) => ({
            key,
            val: val.toString().toUpperCase(),
        }));
        return processedData;
    } catch (error) {
        console.error('Failed to fetch and process data:', error);
    }
}

 
function* fibonacci(n) {
    let [a, b] = [0, 1];
    while (n-- > 0) {
        yield a;
        [a, b] = [b, a + b];
    }
}

 
const fibSequence = [...fibonacci(10)];
print('Fibonacci Sequence:', fibSequence);

 
const handler = {
    get(target, prop) {
        print(`Property accessed: ${prop}`);
        return target[prop];
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, handler);

print(user.name);  

 
(async () => {
    const processedData = await fetchAndProcessData('https://api.example.com/data');
    print('Processed Data:', processedData);
})();

 
const uniqueValues = new Set([1, 2, 3, 2, 4]);
const uniqueId = Symbol('id');

const obj = {
    [uniqueId]: 12345,
    values: [...uniqueValues],
};

print('Unique Values:', obj.values);
print('Unique ID:', obj[uniqueId]);
