 
async function fetchData(url) {
    try {
        const response = await fetch(url);  
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();  
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const target = { message: "Hello, Proxy!" };
const handler = {
    get: (obj, prop) => {
        print(`Property '${prop}' has been accessed.`);
        return obj[prop];
    }
};
const proxy = new Proxy(target, handler);

 
(async function main() {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    const data = await fetchData(url);
    print('Fetched Data:', data);

    const gen = idGenerator();
    print('Generated IDs:', gen.next().value, gen.next().value);

    print('Proxy Message:', proxy.message);
})();
