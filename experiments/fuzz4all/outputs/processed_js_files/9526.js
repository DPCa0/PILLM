 

 
async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

 
function* dataGenerator(dataArray) {
    for (const item of dataArray) {
        yield item;
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' has been accessed.`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Property '${property}' has been set to ${value}.`);
        target[property] = value;
        return true;
    }
};

 
const dataStore = new Proxy({}, handler);

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
         
        const data = await fetchData(url);
        
         
        const iterator = dataGenerator(data);
        
         
        dataStore.firstItem = iterator.next().value;
        
         
        print('Stored Item Title:', dataStore.firstItem.title);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
