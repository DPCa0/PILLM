class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    async enqueue(fn) {
        this.queue.push(fn);
        if (!this.isProcessing) {
            this.isProcessing = true;
            while (this.queue.length) {
                const currentFn = this.queue.shift();
                await currentFn();
            }
            this.isProcessing = false;
        }
    }
}

function debounce(fn, delay) {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

const apiCall = () => new Promise((resolve) => setTimeout(() => {
    print('API Call Complete');
    resolve();
}, 1000));

const queue = new AsyncQueue();

const debouncedEnqueue = debounce((i) => {
    queue.enqueue(async () => {
        await apiCall();
        print(`Task ${i} complete`);
    });
}, 300);

for (let i = 0; i < 5; i++) {
    debouncedEnqueue(i);
}
