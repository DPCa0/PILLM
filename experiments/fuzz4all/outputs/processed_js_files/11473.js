 
const arrayHandler = {
    get(target, property) {
        if (property === 'push') {
            return function(...args) {
                print(`Pushing ${args} to the array`);
                return Array.prototype.push.apply(target, args);
            };
        }
        return target[property];
    }
};

const proxiedArray = new Proxy([], arrayHandler);
proxiedArray.push(1, 2, 3);
print(proxiedArray);

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci(50);
print([...fib]);

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Data fetched:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
print(uniqueNumbers);

 
class Counter {
    #count = 0;

    increment() {
        this.#count++;
        this.#log();
    }

    #log() {
        print(`Current count is ${this.#count}`);
    }
}

const counter = new Counter();
counter.increment();
counter.increment();
