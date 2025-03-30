 
const logWithTimestamp = (message = 'No message', ...additional) => {
    const timestamp = new Date().toISOString();
    print(`[${timestamp}] ${message}`, ...additional);
};

 
const fetchData = async (url) => {
    logWithTimestamp('Fetching data from', url);
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        logWithTimestamp('Data fetched successfully:', data);
        return data;
    } catch (error) {
        logWithTimestamp('Fetch error:', error);
    }
};

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

 
const handler = {
    get: (target, property) => {
        logWithTimestamp(`Property "${property}" accessed.`);
        return target[property];
    },
    set: (target, property, value) => {
        logWithTimestamp(`Property "${property}" changed to "${value}".`);
        target[property] = value;
        return true;
    }
};

const reactiveObject = new Proxy({ id: idGen.next().value, name: 'John Doe' }, handler);

 
(async () => {
    logWithTimestamp('Script started.');

     
    print('Current Name:', reactiveObject.name);
    reactiveObject.name = 'Jane Doe';

     
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
    
    logWithTimestamp('Script ended.');
})();
