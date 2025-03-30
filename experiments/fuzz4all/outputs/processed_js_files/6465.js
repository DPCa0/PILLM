 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
function* chunkData(data, chunkSize) {
    for (let i = 0; i < data.length; i += chunkSize) {
        yield data.slice(i, i + chunkSize);
    }
}

 
const logHandler = {
    get: (target, prop) => {
        print(`Property '${prop}' was accessed`);
        return target[prop];
    },
    set: (target, prop, value) => {
        print(`Setting value ${value} to '${prop}'`);
        target[prop] = value;
        return true;
    }
};

 
let userData = {
    name: "Alice",
    age: 25
};

 
const proxyUserData = new Proxy(userData, logHandler);

 
let { name, age } = proxyUserData;

 
print(`User: ${name}, Age: ${age}`);

 
(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
        const dataGenerator = chunkData(data, 10);

        for (let chunk of dataGenerator) {
            print('Chunk:', chunk);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
