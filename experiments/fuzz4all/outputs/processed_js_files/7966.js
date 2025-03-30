const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(data));
        }
    }
}

const emitter = new EventEmitter();

emitter.on('dataReceived', (data) => {
    print('Data received:', data);
});

(async () => {
    let data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    if (data) {
        emitter.emit('dataReceived', data);
    }
})();

 
const processData = ({ userId = 'Unknown', id, title = 'No title', body }) => {
    print(`Post [${id}] by User [${userId}]: ${title}\n${body}`);
};

 
let postData = data?.[0] ?? { id: 0, body: 'No data available' };
processData(postData);

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}": ${target[prop]}`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist.`);
            return null;
        }
    }
};

const postProxy = new Proxy(postData, handler);
print(postProxy.id);  
print(postProxy.nonExistentProp);  
