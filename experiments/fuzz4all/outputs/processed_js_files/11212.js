 

 
async function* fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
    ];
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property '${prop}' does not exist.`);
            return 'N/A';
        }
    }
};

const dataStore = new Proxy({}, handler);

 
async function processData() {
    const dataIterator = fetchData();
    for await (const data of dataIterator) {
        const { userId, title } = data;
        dataStore[`user${userId}`] = title;
        print(`Stored: User${userId} - Title: ${title}`);
    }

     
    print(dataStore.user1);
    print(dataStore.user4);  
}

 
processData().catch(console.error);
