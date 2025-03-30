class Observable {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(fn) {
        this.subscribers.add(fn);
    }
    
    unsubscribe(fn) {
        this.subscribers.delete(fn);
    }
    
    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

const makeAjaxCall = async (url) => {
     
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Data from ${url}`), 1000);
    });
};

const fetchData = async (url) => {
    try {
        const response = await makeAjaxCall(url);
        print(`Fetched: ${response}`);
        return response;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

 
(async () => {
    const observable = new Observable();
    
     
    observable.subscribe(data => print(`Subscriber 1 received: ${data}`));
    
     
    observable.subscribe(data => print(`Subscriber 2 received: ${data}`));
    
     
    const data = await fetchData('https://api.example.com');
    
     
    if (data) {
        observable.notify(data);
    }
})();
