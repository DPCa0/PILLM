class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    runTask(task) {
        return new Promise((resolve, reject) => {
            const taskWrapper = () => {
                task().then(resolve, reject).finally(() => {
                    this.running--;
                    if (this.queue.length > 0) {
                        const nextTask = this.queue.shift();
                        this.running++;
                        nextTask();
                    }
                });
            };

            if (this.running < this.concurrency) {
                this.running++;
                taskWrapper();
            } else {
                this.queue.push(taskWrapper);
            }
        });
    }
}

 

function* numberGenerator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function mockAPICall(number) {
    await delay(Math.random() * 1000);
    print(`Processed number: ${number}`);
}

(async () => {
    const taskQueue = new TaskQueue(3);
    const gen = numberGenerator();
    
    const tasks = Array.from({length: 10}, async () => {
        const { value: number } = gen.next();
        await taskQueue.runTask(() => mockAPICall(number));
    });
    
    await Promise.all(tasks);
    print("All tasks completed");
})();
