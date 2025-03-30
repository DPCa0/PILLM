 
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

     
    emit(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(listener => listener(...args));
        }
    }

     
    off(event, listenerToRemove) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(listener => listener !== listenerToRemove);
    }
}

 
const emitter = new EventEmitter();

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        emitter.emit('dataReceived', data);
    } catch (error) {
        emitter.emit('error', error);
    }
}

 
function* dataIterator(dataArray) {
    for (let item of dataArray) {
        yield item;
    }
}

 
emitter.on('dataReceived', data => {
    print('Data received: ', data);
    
     
    const iterator = dataIterator(data);
    for (let item of iterator) {
        print('Iterating item:', item);
    }
});

 
emitter.on('error', error => {
    console.error('An error occurred:', error);
});

 
fetchData('https://jsonplaceholder.typicode.com/posts');
