class Observer {
    constructor() {
        this.subscribers = new Map();
    }
  
    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }
  
    emit(event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(callback => callback(data));
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

const observer = new Observer();

observer.subscribe('dataFetched', data => {
    print('Data received:', data);
});

const debouncedFetchData = debounce(async (url) => {
    try {
        const data = await fetchData(url);
        observer.emit('dataFetched', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, 300);

 
debouncedFetchData('https://jsonplaceholder.typicode.com/todos/1');
debouncedFetchData('https://jsonplaceholder.typicode.com/todos/2');
