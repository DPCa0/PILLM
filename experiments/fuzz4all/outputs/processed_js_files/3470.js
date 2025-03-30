class Task {
    #status = 'pending';
    
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }
    
    async start() {
        print(`Starting task: ${this.name}`);
        this.#status = 'in-progress';
        await this.#simulateAsyncTask();
        this.#status = 'completed';
        print(`Completed task: ${this.name}`);
    }
    
    #simulateAsyncTask() {
        return new Promise(resolve => setTimeout(resolve, this.duration));
    }
    
    getStatus() {
        return this.#status;
    }
}

const executeTasks = async (tasks) => {
    await Promise.all(tasks.map(task => task.start()));
    print('All tasks completed');
}

const task1 = new Task('Task 1', 1000);
const task2 = new Task('Task 2', 2000);
const task3 = new Task('Task 3', 1500);

executeTasks([task1, task2, task3]);

const taskStatuses = [task1, task2, task3].map(task => task.getStatus());
print('Task statuses:', taskStatuses);
