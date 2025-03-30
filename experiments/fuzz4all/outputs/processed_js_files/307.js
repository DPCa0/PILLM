 
function* fibonacci(max) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < max; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const handler = {
    get(target, property) {
        print(`Accessed property "${property}"`);
        return Reflect.get(target, property);
    }
};

const proxy = new Proxy({ a: 1, b: 2, c: 3 }, handler);

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const [first, second, ...rest] = [...fibonacci(10)];
print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

 
(async () => {
     
    const module = await import('./myModule.js').catch(() => ({ default: 'Module not found' }));
    print('Dynamically Imported Module:', module.default);

     
    print('Proxy access:', proxy.a, proxy.b, proxy.c);
})();

 
fetchData('https://jsonplaceholder.typicode.com/todos/1');
