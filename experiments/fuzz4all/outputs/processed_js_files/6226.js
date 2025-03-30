class Task {
    constructor(title, isComplete = false) {
        this.title = title;
        this.isComplete = isComplete;
    }
    
    complete() {
        this.isComplete = true;
    }

    static fromJson({ title, isComplete }) {
        return new Task(title, isComplete);
    }
}

const tasks = [
    { title: "Learn JavaScript", isComplete: false },
    { title: "Build a project", isComplete: true },
    { title: "Read a book", isComplete: false }
];

async function getTasksAsync() {
    return new Promise(resolve => {
        setTimeout(() => resolve(tasks.map(Task.fromJson)), 1000);
    });
}

async function displayTasks() {
    const retrievedTasks = await getTasksAsync();
    for (const task of retrievedTasks) {
        print(`Task: ${task.title}, Completed: ${task.isComplete}`);
    }
}

(async () => {
    await displayTasks();
})();

 
const handler = {
    set(target, prop, value) {
        print(`Property ${prop} changed to ${value}`);
        target[prop] = value;
        return true;
    }
};

const task = new Task("Write code");
const proxyTask = new Proxy(task, handler);
proxyTask.complete();
