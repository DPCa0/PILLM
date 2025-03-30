 
async function fetchData(url) {
     
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const processData = ([first, second, ...rest]) => {
    print(`First item: ${first}, Second item: ${second}`);
    print('Remaining items:', rest);
};

 
const dataHandler = {
    get: (target, prop) => {
        print(`Getting property ${prop}`);
        return prop in target ? target[prop] : 'Not Found';
    },
    set: (target, prop, value) => {
        print(`Setting property ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
const dataProxy = new Proxy({}, dataHandler);

 
(async function main() {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const data = await fetchData(url);
        processData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }

     
    const gen = idGenerator();
    print('Generated IDs:', gen.next().value, gen.next().value, gen.next().value);

     
    dataProxy.title = 'JavaScript Advanced Features';
    print(dataProxy.title);
    print(dataProxy.nonExistentProperty);
})();
