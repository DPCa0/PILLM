class Observable {
    constructor() {
        this.observers = new Set();
    }
    
    subscribe(observer) {
        this.observers.add(observer);
    }
    
    unsubscribe(observer) {
        this.observers.delete(observer);
    }
    
    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const useFetch = (url) => {
    const observable = new Observable();

    (async () => {
        try {
            const data = await fetchData(url);
            observable.notify({ status: 'success', data });
        } catch (error) {
            observable.notify({ status: 'error', error });
        }
    })();

    return observable;
};

const observerA = (update) => {
    if (update.status === 'success') {
        print('Observer A received data:', update.data);
    } else {
        console.error('Observer A encountered error:', update.error);
    }
};

const observerB = (update) => {
    if (update.status === 'success') {
        print('Observer B processing data:', update.data);
    } else {
        console.error('Observer B error handling:', update.error);
    }
};

const observable = useFetch('https://jsonplaceholder.typicode.com/todos/1');
observable.subscribe(observerA);
observable.subscribe(observerB);

 
setTimeout(() => {
    observable.unsubscribe(observerA);
    print('Observer A unsubscribed.');
}, 5000);
