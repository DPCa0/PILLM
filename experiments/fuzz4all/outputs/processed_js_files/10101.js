 
const observedObject = new Proxy({}, {
    get(target, prop) {
        print(`Property '${prop}' was accessed with value: ${target[prop]}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        print(`Property '${prop}' was set to value: ${value}`);
        return Reflect.set(target, prop, value);
    }
});

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        print('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const urls = ['https://api.github.com', 'https://jsonplaceholder.typicode.com/todos/1'];
const fetchPromises = urls.map(url => fetchData(url));

 
observedObject.name = "Advanced JS";
observedObject.version = "ES2023";

 
const fibSequence = fibonacci();
print('First 5 Fibonacci numbers:');
for (let i = 0; i < 5; i++) {
    print(fibSequence.next().value);
}

 
Promise.all(fetchPromises).then(() => print('All fetch operations complete'));
