 
function* fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const target = { x: 10, y: 20 };
const handler = {
    get: (obj, prop) => {
        print(`Getting ${prop}`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        print(`Setting ${prop} to ${value}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Fetched data:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const obj = {};
Object.defineProperty(obj, 'dynamic', {
    get() {
        return `Random value: ${Math.random()}`;
    }
});

 
(function execute() {
    print('Fibonacci sequence up to 5 terms:');
    for (let num of fibonacciGenerator(5)) {
        print(num);
    }

    proxy.x = 30;
    print(proxy.x);

    fetchData('https://jsonplaceholder.typicode.com/todos/1');

    print(obj.dynamic);
})();
