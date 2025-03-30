 

 
function* fetchDataGenerator(urls) {
    for (let url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    }
};

const dataProxy = new Proxy({}, handler);

 
async function fetchAndStoreData(urls) {
    const generator = fetchDataGenerator(urls);

    for (let result of generator) {
        let data = await result;   
        dataProxy[data.id] = data;   
    }
    print("Data fetching and storing completed.");
}

 
const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2'
];

fetchAndStoreData(urls)
    .then(() => {
         
        print(dataProxy[1]);
        print(dataProxy[2]);
    })
    .catch(error => console.error("Error fetching data:", error));
