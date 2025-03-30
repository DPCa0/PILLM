 

 
async function fetchData(url) {
     
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

 
function* chunkGenerator(data, chunkSize) {
    for (let i = 0; i < data.length; i += chunkSize) {
        yield data.slice(i, i + chunkSize);
    }
}

 
const dataHandler = {
    get(target, property) {
        print(`Getting property ${property}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

(async () => {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
    const data = await fetchData(dataUrl);

     
    const proxiedData = new Proxy(data, dataHandler);

     
    const generator = chunkGenerator(proxiedData, 5);

    for (let chunk of generator) {
        print('Chunk:', chunk);
    }
})();
