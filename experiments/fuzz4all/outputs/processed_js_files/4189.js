 
const flatten = (...arrays) => arrays.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatten(...val) : val), []);

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (curr <= limit) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const logger = {
    get: (target, property) => {
        print(`Accessing ${property}`);
        return property in target ? target[property] : undefined;
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

 
const array = [1, [2, [3, 4]], 5];
print('Flattened array:', flatten(...array));

const fibSequence = [...fibonacci(10)];
print('Fibonacci sequence:', fibSequence);

const obj = new Proxy({}, logger);
obj.foo = 'bar';
print('Access foo:', obj.foo);

fetchData('https://jsonplaceholder.typicode.com/posts/1');
