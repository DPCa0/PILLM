class Observable {
    constructor(data) {
        this.data = data;
        this.subscribers = [];
    }
    
    subscribe(callback) {
        this.subscribers.push(callback);
    }
    
    notify() {
        this.subscribers.forEach(callback => callback(this.data));
    }

    set state(newData) {
        this.data = newData;
        this.notify();
    }

    get state() {
        return this.data;
    }
}

const stateManager = new Observable({ counter: 0 });

stateManager.subscribe(state => print(`State updated: ${JSON.stringify(state)}`));

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const incrementCounter = async () => {
    for (let i = 1; i <= 5; i++) {
        await delay(1000);
        stateManager.state = { ...stateManager.state, counter: i };
    }
};

const asyncFactorial = async n => {
    if (n < 0) return Promise.reject("Negative values not allowed");
    const result = (n <= 1) ? 1 : n * await asyncFactorial(n - 1);
    print(`Factorial of ${n} is ${result}`);
    return result;
};

incrementCounter();
asyncFactorial(5).catch(console.error);
