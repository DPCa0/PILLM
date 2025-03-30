 
const { EventEmitter } = require('events');

 
const fetchData = async (url) => {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
};

 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Accessed property "${property}"`);
            return target[property];
        }
        throw new Error(`Property "${property}" not found`);
    },
};

 
class DataContainer {
    constructor(initialData) {
        this.data = initialData;
    }

    updateData(newData) {
        this.data = newData;
    }
}

 
const initialData = { message: "Hello, world!" };
const container = new Proxy(new DataContainer(initialData), handler);

 
const eventEmitter = new EventEmitter();

 
eventEmitter.on('dataUpdated', async (url) => {
    try {
        const newData = await fetchData(url);
        container.updateData(newData);
        print('Data updated:', container.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

 
eventEmitter.emit('dataUpdated', 'https://jsonplaceholder.typicode.com/todos/1');

 
print(container.data.message);
