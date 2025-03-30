const fetchData = async (url) => {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch Error:', error);
    }
};

class Observer {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

const url = 'https://jsonplaceholder.typicode.com/posts';
const observer = new Observer();

observer.subscribe(data => {
    print('First observer:', data.map(post => post.title));
});

observer.subscribe(data => {
    print('Second observer:', data.filter(post => post.id % 2 === 0).map(post => post.title));
});

(async () => {
    const data = await fetchData(url);
    if (data) observer.notify(data);
})();
