class Task {
    #status = "pending";
    constructor(description) {
        this.description = description;
    }
    
    get status() {
        return this.#status;
    }
    
    set status(newStatus) {
        if (["pending", "completed", "failed"].includes(newStatus)) {
            this.#status = newStatus;
        } else {
            throw new Error("Invalid status");
        }
    }
    
    complete() {
        this.status = "completed";
    }
}

const taskManager = (() => {
    const tasks = new WeakMap();

    return {
        addTask(task) {
            tasks.set(task, task.status);
        },
        listTasks() {
            return [...tasks.keys()].map(task => ({
                description: task.description,
                status: tasks.get(task),
            }));
        },
        completeTask(task) {
            if (tasks.has(task)) {
                task.complete();
                tasks.set(task, task.status);
            } else {
                print("Task not found");
            }
        },
    };
})();

const task1 = new Task("Finish project");
const task2 = new Task("Study for exams");

taskManager.addTask(task1);
taskManager.addTask(task2);

taskManager.completeTask(task1);

print(JSON.stringify(taskManager.listTasks(), null, 2));

 
 
 
 
 
 
 
 
 
 
 
