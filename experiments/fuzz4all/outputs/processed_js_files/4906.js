class AsyncQueue {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;
        while (this.queue.length) {
            const task = this.queue.shift();
            await task();
        }
        this.isProcessing = false;
    }

    enqueue(task) {
        this.queue.push(task);
        this.processQueue();
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchData(id) {
    print(`Fetching data for ID: ${id}`);
    await delay(1000);  
    print(`Data received for ID: ${id}`);
    return `Data for ID: ${id}`;
}

function* idGenerator(max) {
    for (let i = 1; i <= max; i++) {
        yield i;
    }
}

const asyncQueue = new AsyncQueue();
const ids = idGenerator(5);

for (const id of ids) {
    asyncQueue.enqueue(async () => {
        const data = await fetchData(id);
        print(data);
    });
}

 
const logResult = (...results) => results.forEach(({id, data}) => print(`ID: ${id}, Data: ${data}`));

 
logResult({id: 1, data: 'Sample 1'}, {id: 2, data: 'Sample 2'});
