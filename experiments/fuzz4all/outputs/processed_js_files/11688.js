 

 
async function* fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property ${prop}`);
            return target[prop];
        } else {
            print(`Property ${prop} not found!`);
            return null;
        }
    }
};

 
(async () => {
    const dataGenerator = fetchData();
    for await (const data of dataGenerator) {
        const proxiedData = new Proxy(data, handler);
         
        print(`Fetched data: ${proxiedData.title || 'No Title'}`);
    }
})();
