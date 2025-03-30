 

async function* fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

async function processData() {
    const dataGenerator = fetchData();

    for await (let dataPromise of dataGenerator) {
        const data = await dataPromise;
        print(`Title: ${data.title}`);
    }
}

function complexCalculation({ a, b, c }) {
     
    const sum = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);
    
     
    const total = sum(a ?? 0, b ?? 0, c?.d ?? 0);
    print(`Total: ${total}`);
}

processData();
complexCalculation({ a: 5, b: 10, c: { d: 15 } });
