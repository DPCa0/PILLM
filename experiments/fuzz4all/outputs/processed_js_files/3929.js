 
class Task {
    #status;  
    constructor(title) {
        this.title = title;
        this.#status = "pending";  
    }
    complete() {
        this.#status = "completed";
    }
    getStatus() {
        return this.#status;
    }
}

 
const taskHandler = {
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    },
    get(target, property) {
        print(`Getting ${property}`);
        return target[property];
    }
};

 
const taskSymbol = Symbol("task");

const tasks = {
    [taskSymbol]: new Proxy(new Task('Learn advanced JS'), taskHandler)
};

 
async function completeTask(task) {
    print("Starting task...");
    await new Promise(resolve => setTimeout(resolve, 1000));  
    task.complete();
    print(`Task status: ${task.getStatus()}`);
}

 
(async () => {
    const task = tasks[taskSymbol];
    print(`Task title: ${task.title}`);
    await completeTask(task);
})();
