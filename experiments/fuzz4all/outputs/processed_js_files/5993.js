class Observable {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(event, callback) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, []);
        }
        this.subscribers.get(event).push(callback);
    }

    notify(event, data) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).forEach(callback => callback(data));
        }
    }
}

const observable = new Observable();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function simulateAsyncProcess() {
    print('Starting process...');
    for (let i = 1; i <= 3; i++) {
        await delay(1000);
        observable.notify('progress', `Step ${i} completed`);
    }
    observable.notify('complete', 'Process completed successfully');
}

observable.subscribe('progress', data => print(`Progress: ${data}`));
observable.subscribe('complete', data => print(`Complete: ${data}`));

(async () => {
    try {
        await simulateAsyncProcess();
        print('Async operation finished');
    } catch (err) {
        console.error('Error:', err);
    }
})();
