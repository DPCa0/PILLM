 

 
const TASK_COMPLETED = Symbol("taskCompleted");

class TaskManager {
    constructor() {
        this.tasks = new Set();
        this.completed = 0;
    }

    addTask(task) {
        this.tasks.add(task);
    }

     
    async executeTasks() {
        const taskPromises = [...this.tasks].map(task => task());
        for await (let result of taskPromises) {
            if (result === TASK_COMPLETED) {
                this.completed++;
            }
        }
        print(`Completed ${this.completed} out of ${this.tasks.size} tasks.`);
    }
}

 
const taskHandler = {
    apply: async function(target, thisArg, args) {
        print(`Executing task: ${args[0]}`);
        await new Promise(resolve => setTimeout(resolve, 1000));  
        print(`Completed task: ${args[0]}`);
        return TASK_COMPLETED;
    }
};

 
const asyncTask = name => async () => name;

 
const taskNames = ["Task 1", "Task 2", "Task 3"];
const wrappedTasks = taskNames.map(name => new Proxy(asyncTask(name), taskHandler));

 
const taskManager = new TaskManager();
wrappedTasks.forEach(task => Reflect.apply(taskManager.addTask, taskManager, [task]));

 
taskManager.executeTasks();
