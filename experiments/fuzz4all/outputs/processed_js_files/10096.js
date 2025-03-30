 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Property accessed: ${prop}`);
        return Reflect.get(target, prop, receiver);
    }
};

const fibonacciSequence = new Proxy({
    sequence: [...fibonacci(10)]
}, handler);

 
function html(strings, ...values) {
    return strings.raw.reduce((result, string, i) => {
        const value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return `${result}${string}${value}`;
    }, '');
}

 
async function fetchData() {
    try {
        const response = await fetch('https://api.github.com');
        const data = await response.json();
        print(html`Fetched data: ${JSON.stringify(data, null, 2)}`);
    } catch (error) {
        console.error(html`Error fetching data: ${error}`);
    }
}

 
(async function({ limit = 5 } = {}) {
    print(html`First ${limit} Fibonacci numbers:`);
    print(fibonacciSequence.sequence.slice(0, limit));
    await fetchData();
})({ limit: 7 });
