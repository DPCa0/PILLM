class TaskManager {
    #tasks = new WeakMap();

    constructor() {
        this.#tasks.set(this, []);
    }

    addTask(task) {
        const tasks = this.#tasks.get(this);
        if (typeof task === 'string' && !tasks.includes(task)) {
            tasks.push(task);
        }
    }

    removeTask(task) {
        const tasks = this.#tasks.get(this);
        this.#tasks.set(this, tasks.filter(t => t !== task));
    }

    listTasks() {
        return [...this.#tasks.get(this)];
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function executeTasks(taskManager) {
    for (const task of taskManager.listTasks()) {
        print(`Executing: ${task}`);
        await delay(1000);  
    }
}

function executeWithRetry(task, retries = 3) {
    return function retry() {
        return task().catch(err => {
            if (retries > 1) {
                print(`Retrying... (${retries - 1} attempts left)`);
                return executeWithRetry(task, retries - 1)();
            } else {
                return Promise.reject(err);
            }
        });
    };
}

const taskManager = new TaskManager();
taskManager.addTask("Task 1");
taskManager.addTask("Task 2");
taskManager.addTask("Task 3");

executeTasks(taskManager).then(() => {
    print('All tasks executed.');
});

const taskWithFailure = executeWithRetry(() => {
    return new Promise((resolve, reject) => {
        if (Math.random() > 0.5) {
            resolve("Task succeeded!");
        } else {
            reject("Task failed!");
        }
    });
});

taskWithFailure().then(console.log).catch(console.error);
