 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessing property "${property}": ${target[property]}`);
            return target[property];
        }
        print(`Property "${property}" not found.`);
        return undefined;
    },
    set: function(target, property, value) {
        print(`Setting property "${property}" to ${value}`);
        target[property] = value;
        return true;
    }
};

const targetObject = { name: 'JavaScript', type: 'Programming Language' };
const proxy = new Proxy(targetObject, handler);

 
function* fibonacciGen(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        [prev, curr] = [curr, prev + curr];
        yield prev;
    }
}

 
const fib = fibonacciGen(10);
print('Fibonacci Series:');
for (let num of fib) {
    print(num);
}

 
const version = 'ES6+';
const features = { asyncAwait: true, proxy: true, generator: true };
const jsInfo = { version, ...features };

 
const { asyncAwait, proxy: proxyFeature } = jsInfo;
print(`JavaScript version: ${version}, Async/Await support: ${asyncAwait}, Proxy support: ${proxyFeature}`);

 
(function() {
    const message = 'JavaScript is powerful!';
    print(`IIFE Log: ${message}`);
})();

 
(async function() {
    await fetchData('https://jsonplaceholder.typicode.com/posts');
    proxy.name;  
    proxy.category = 'Scripting Language';  
})();