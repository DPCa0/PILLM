 

 
async function fetchData(url) {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
}

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const handler = {
    get: (obj, prop) => {
        print(`Getting property '${prop}'`);
        return prop in obj ? obj[prop] : 'Not found';
    },
    set: (obj, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        obj[prop] = value;
        return true;
    }
};

const user = new Proxy({}, handler);

 
(async function main() {
    const idGen = idGenerator();
    
     
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    
    try {
        const data = await fetchData(url);
        print('Fetched Data:', data);
    } catch (error) {
        console.error('Fetch Error:', error);
    }
    
     
    user.name = 'Alice';
    print('Name:', user.name);
    
    print('Generated IDs:', idGen.next().value, idGen.next().value, idGen.next().value);
})();
