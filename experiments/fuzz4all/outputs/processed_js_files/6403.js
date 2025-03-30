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

function* fibonacciGenerator() {
    let [prev, current] = [0, 1];
    while (true) {
        [prev, current] = [current, prev + current];
        yield current;
    }
}

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

const fibonacci = fibonacciGenerator();
const fibObservable = new Observable();

fibObservable.subscribe(console.log);

(async () => {
    try {
        const data = await fetchJson('https://api.github.com');
        fibObservable.subscribe(num => print(`Fibonacci: ${num}, API User: ${data.current_user_url}`));
    } catch (e) {
        console.error(e);
    }

    for (let i = 0; i < 10; i++) {
        fibObservable.notify(fibonacci.next().value);
    }
})();
