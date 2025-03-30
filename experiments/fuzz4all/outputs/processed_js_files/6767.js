 

 
class FibonacciSequence {
    *[Symbol.iterator]() {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
}

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        let data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting property: ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting property: ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const originalObject = { a: 1, b: 2 };
const proxyObject = new Proxy(originalObject, handler);

 
(async () => {
    const fib = new FibonacciSequence();
    print('First 10 Fibonacci numbers:');
    for (const num of fib) {
        if (num > 34) break;
        print(num);
    }

     
    await fetchData('https://jsonplaceholder.typicode.com/posts/1');

     
    print(proxyObject.a);  
    proxyObject.b = 42;  
})();
