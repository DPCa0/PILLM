 

 
function* fetchDataGenerator() {
    yield fetch('https://jsonplaceholder.typicode.com/posts/1');
    yield fetch('https://jsonplaceholder.typicode.com/posts/2');
}

 
async function processGenerator(generator) {
    const data = [];
    for (let promise of generator) {
        const response = await promise;
        const jsonData = await response.json();
        data.push(jsonData);
    }
    return data;
}

 
const dataHandler = {
    get: function(target, property) {
        if (property in target) {
            print(`Accessing property '${property}':`, target[property]);
            return target[property];
        }
        print(`Property '${property}' not found.`);
        return undefined;
    }
};

 
(async () => {
    const generator = fetchDataGenerator();
    const data = await processGenerator(generator);

     
    const dataProxy = new Proxy(data, dataHandler);

     
    print(dataProxy[0]);  
    print(dataProxy[1]);  
    print(dataProxy[2]);  
})();
