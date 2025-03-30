class AsyncQueue {
    constructor() {
        this.queue = [];
        this.processing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        if (!this.processing) this._processQueue();
    }

    async _processQueue() {
        this.processing = true;
        while (this.queue.length) {
            const task = this.queue.shift();
            try {
                await task();
            } catch (error) {
                console.error('Task failed', error);
            }
        }
        this.processing = false;
    }
}

 
const store = new Proxy({}, {
    get(target, prop) {
        print(`Getting ${prop}: ${target[prop]}`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Setting ${prop}: ${value}`);
        target[prop] = value;
        return true;
    }
});

 
async function task1() {
    return new Promise((resolve) => {
        setTimeout(() => {
            store.value1 = "Task 1 completed";
            resolve();
        }, 1000);
    });
}

async function task2() {
    return new Promise((resolve) => {
        setTimeout(() => {
            store.value2 = "Task 2 completed";
            resolve();
        }, 500);
    });
}

async function main() {
    const queue = new AsyncQueue();
    queue.enqueue(task1);
    queue.enqueue(task2);

     
    const { sqrt } = await import('mathjs');
    print(`Square root of 16 is ${sqrt(16)}`);

    setTimeout(() => {
        print('Final Store State:', { ...store });
    }, 2000);
}

main().catch(error => console.error('Error in main', error));
