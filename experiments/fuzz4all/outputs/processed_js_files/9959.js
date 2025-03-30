const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

class Observer {
    constructor() {
        this.subscribers = [];
    }
    
    subscribe(fn) {
        this.subscribers.push(fn);
    }
    
    unsubscribe(fn) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn);
    }
    
    notify(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

const dataObserver = new Observer();

dataObserver.subscribe(data => {
    print('Subscriber 1:', data);
});

dataObserver.subscribe(data => {
    print('Subscriber 2:', data);
});

(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    if (data) {
        dataObserver.notify(data.slice(0, 5));  
    }
})();

const randomPost = async () => {
    const posts = await fetchData('https://jsonplaceholder.typicode.com/posts');
    const randomIndex = Math.floor(Math.random() * posts.length);
    return posts[randomIndex];
};

randomPost().then(post => {
    print('Random Post:', post);
});

const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const pipe = (...functions) => (input) => functions.reduce((acc, fn) => fn(acc), input);

const calculate = pipe(
    (num) => add(num, 10),
    (num) => multiply(num, 2),
);

print('Pipeline Result:', calculate(5));  
