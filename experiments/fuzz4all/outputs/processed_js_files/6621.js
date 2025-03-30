class TaskManager {
    constructor() {
        this.tasks = new Map();
    }

    async addTask(id, taskFunction) {
        if (!this.tasks.has(id)) {
            this.tasks.set(id, taskFunction);
            print(`Task ${id} added.`);
        } else {
            print(`Task ${id} already exists.`);
        }
    }

    async executeAll() {
        const results = await Promise.allSettled(
            [...this.tasks].map(([id, taskFn]) =>
                taskFn().catch(error => ({ id, error }))
            )
        );
        results.forEach((result, index) => {
            const [id] = [...this.tasks.keys()][index];
            if (result.status === 'fulfilled') {
                print(`Task ${id} succeeded with result:`, result.value);
            } else {
                console.error(`Task ${id} failed with error:`, result.reason || result.error);
            }
        });
    }
}

 
const taskManager = new TaskManager();

taskManager.addTask('1', async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 'Result from task 1';
});

taskManager.addTask('2', async () => {
    await new Promise((_, reject) => setTimeout(() => reject('Error in task 2'), 500));
});

taskManager.addTask('3', async () => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return 'Result from task 3';
});

taskManager.executeAll();
