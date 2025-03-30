 
const asyncHandler = fn => (...args) => fn(...args).catch(console.error);

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const fetchData = async url => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

 
const createLoggingProxy = data => new Proxy(data, {
    get(target, prop) {
        print(`Accessed property: ${prop}`);
        return Reflect.get(target, prop);
    }
});

 
function* numberGenerator() {
    let num = 0;
    while (true) yield num++;
}

 
async function* dataFetcher(urls) {
    for (const url of urls) {
        const data = await fetchData(url);
        yield createLoggingProxy(data);
    }
}

 
const main = asyncHandler(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];

    const numberGen = numberGenerator();

    for await (const data of dataFetcher(urls)) {
        print(`Processing item: ${numberGen.next().value}`);
        print(data.title);  
        await delay(1000);  
    }
});

 
main();
