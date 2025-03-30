 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

 
const handler = {
    get: function(target, property) {
        print(`Getting value of ${property}`);
        return target[property];
    },
    set: function(target, property, value) {
        print(`Setting value of ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

const data = new Proxy({}, handler);

 
function* generateSequence(start = 0) {
    let value = start;
    while (true) {
        yield value++;
    }
}

const seq = generateSequence();

 
const uniqueData = new Set();
const dataMap = new Map();

 
(async () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    try {
        const { id, title, completed } = await fetchData(url);
        
        uniqueData.add(id);
        data.title = title;
        data.completed = completed;
        
        dataMap.set(id, { title, completed });
        
        print(`Data fetched: ${id}, ${title}, Completed: ${completed}`);
        
         
        print(data.title);
        data.newProperty = 'Added via Proxy';
        
         
        print(`Generated Sequence: ${seq.next().value}, ${seq.next().value}`);
        
         
        print('Unique IDs:', Array.from(uniqueData));
        print('Data Map:', Array.from(dataMap.entries()));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
