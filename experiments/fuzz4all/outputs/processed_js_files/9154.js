 
const fibonacci = {
    [Symbol.iterator]() {
        let prev = 0, curr = 1;
        return {
            next() {
                [prev, curr] = [curr, prev + curr];
                return { done: false, value: curr };
            }
        };
    }
};

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const logger = {
    get(target, property) {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    }
};

const user = new Proxy({ name: 'Alice', age: 30 }, logger);
print(user.name);  

 
(async () => {
    print('First 5 Fibonacci numbers:');
    for (const n of Array.from(fibonacci).slice(0, 5)) {
        print(n);
    }

    print('Range from 5 to 10:');
    for (const num of range(5, 10)) {
        print(num);
    }

    print('Fetching data from API:');
    await fetchData('https://jsonplaceholder.typicode.com/posts/1');
})();
