class Observable {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(callback) {
        this.subscribers.add(callback);
    }
    
    unsubscribe(callback) {
        this.subscribers.delete(callback);
    }
    
    notify(data) {
        this.subscribers.forEach(callback => callback(data));
    }
}

const dataStream = new Observable();

const processData = async () => {
    const data = await fetchData();
    dataStream.notify(data);
};

async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ message: 'Hello, advanced JavaScript!' });
        }, 1000);
    });
}

const observer1 = (data) => print('Observer 1:', data.message);
const observer2 = (data) => print('Observer 2:', data.message);

dataStream.subscribe(observer1);
dataStream.subscribe(observer2);

processData();

 
import('./dynamicModule.js').then(module => {
    module.dynamicFunction();
}).catch(err => console.error('Error loading module:', err));

Ensure you have a `dynamicModule.js` file in the same directory with an exported function `dynamicFunction` to fully utilize the dynamic import feature.