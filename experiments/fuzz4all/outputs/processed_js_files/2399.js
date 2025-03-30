class AsyncQueue {
    constructor() {
        this.tasks = [];
    }
    
    async run() {
        for (const task of this.tasks) {
            await task();
        }
    }
    
    addTask(task) {
        this.tasks.push(task);
    }
}

async function complexFunction(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const processedData = data.map(item => item * 2);
            resolve(processedData);
        }, 1000);
    });
}

async function* dataGenerator(initialData) {
    let data = initialData;
    while (data.length > 0) {
        await new Promise(r => setTimeout(r, 500));
        yield data.shift();
    }
}

const initialData = [1, 2, 3, 4, 5];
const asyncQueue = new AsyncQueue();

(async () => {
    const generator = dataGenerator(initialData);

    for await (const value of generator) {
        asyncQueue.addTask(async () => {
            const result = await complexFunction([value]);
            print(`Processed: ${result}`);
        });
    }

    await asyncQueue.run();
    print('All tasks completed.');
})();
