 
function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const memoizedFibonacci = memoize((index) => {
    const gen = fibonacci();
    let value;
    for (let i = 0; i < index; i++) {
        value = gen.next().value;
    }
    return value;
});

 
async function fetchJson(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}

 
async function tellJoke() {
    const jokeData = await fetchJson('https://official-joke-api.appspot.com/random_joke');
    if (jokeData) {
        print(`Here's a joke for you: ${jokeData.setup} - ${jokeData.punchline}`);
    }
}

 
print(memoizedFibonacci(10));  
print(memoizedFibonacci(20));  
print(memoizedFibonacci(30));  

 
tellJoke();
