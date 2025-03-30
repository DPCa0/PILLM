 
const uniqueIdGenerator = (() => {
    let id = 0;
    return () => `id_${++id}`;
})();

 
class TaskManager {
    #tasks = new Map();

    constructor() {
        this.init();
    }

     
    addTask(name, priority = 'low') {
        const id = uniqueIdGenerator();
        this.#tasks.set(id, { name, priority });
        this.#logTaskAdded(id, name, priority);
        return id;
    }

     
    async executeTasks() {
        print('Executing all tasks...');
        const promises = [...this.#tasks.values()].map(task =>
            this.#simulateTaskExecution(task.name, task.priority)
        );
        await Promise.all(promises);
        print('All tasks executed.');
    }

     
    async *#simulateTaskExecution(name, priority) {
        print(`Started task "${name}" with priority "${priority}"`);
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        print(`Completed task "${name}"`);
    }

     
    #logTaskAdded(id, name, priority) {
        print(`Task added: [${id}] - ${name} (${priority})`);
    }

     
    init() {
        const { addTask, executeTasks } = this;
        addTask.call(this, 'Initial Setup', 'high');
        executeTasks.call(this);
    }
}

 
const manager = new TaskManager();
const taskId1 = manager.addTask('Database Migration', 'high');
const taskId2 = manager.addTask('API Integration', 'medium');

setTimeout(() => manager.executeTasks(), 2000);
