 
const handler = {
    get: function(target, property, receiver) {
        if (property in target) {
            print(`Accessed property '${property}' with value: ${target[property]}`);
            return Reflect.get(...arguments);
        } else {
            console.warn(`Property '${property}' does not exist.`);
            return undefined;
        }
    },
    set: function(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        return Reflect.set(...arguments);
    }
};

const user = new Proxy({}, handler);

 
user.name = "Alice";
print(user.name);
print(user.age);  

 
function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci(10);
for (let value of fib) {
    print(value);
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetching error:', error);
    }
}

 
fetchData('https://api.example.com/data');
