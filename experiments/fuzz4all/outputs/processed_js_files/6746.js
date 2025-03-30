 

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

 
function* fibonacciGen(limit) {
    let [prev, curr] = [0, 1];
    while (limit-- > 0) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const targetObject = { a: 1, b: 2, c: 3 };
const handler = {
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value * 2;   
        return true;
    }
};
const proxyObject = new Proxy(targetObject, handler);

 
function tag(strings, ...values) {
    return strings.reduce((result, str, i) => result + str + (values[i] || '').toUpperCase(), '');
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

const fib = fibonacciGen(5);
for (const num of fib) {
    print('Fibonacci:', num);
}

print(proxyObject.a);
proxyObject.b = 10;

const name = 'world';
print(tag`Hello, ${name}! How are you ${'today'}?`);
