class TaskScheduler {
    constructor() {
        this.taskQueue = [];
    }

    addTask(task, delay) {
        this.taskQueue.push({ task, delay });
        return this;
    }

    run() {
        const executeTasks = async () => {
            while (this.taskQueue.length > 0) {
                const { task, delay } = this.taskQueue.shift();
                await new Promise(resolve => setTimeout(resolve, delay));
                await task();
            }
        };

        executeTasks().catch(console.error);
    }
}

 
const asyncTask = async (taskName) => {
    try {
        print(`Starting ${taskName}`);
        if (Math.random() > 0.5) throw new Error(`Error in ${taskName}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        print(`${taskName} completed successfully`);
    } catch (error) {
        console.error(error.message);
    }
};

 
const loggingHandler = {
    apply: function(target, thisArg, args) {
        print(`Executing: ${target.name}`);
        return target(...args);
    }
};

const proxiedAsyncTask = new Proxy(asyncTask, loggingHandler);

const scheduler = new TaskScheduler();
scheduler
    .addTask(() => proxiedAsyncTask('Task 1'), 1000)
    .addTask(() => proxiedAsyncTask('Task 2'), 2000)
    .addTask(() => proxiedAsyncTask('Task 3'), 3000)
    .run();
