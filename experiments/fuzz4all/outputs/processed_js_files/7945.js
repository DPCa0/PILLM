class Task {
    #title;
    #completed;
    
    constructor(title) {
        this.#title = title;
        this.#completed = false;
    }
    
    toggleCompletion() {
        this.#completed = !this.#completed;
    }
    
    get status() {
        return `${this.#title} is ${this.#completed ? 'completed' : 'not completed'}`;
    }
}

const asyncProcess = async (task) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            task.toggleCompletion();
            resolve(task.status);
        }, 1000);
    });
};

const manageTasks = async () => {
    const tasks = [
        new Task('Learn Promises'),
        new Task('Master Async/Await'),
        new Task('Explore ES6 Features')
    ];
    
    try {
        const results = await Promise.all(tasks.map(asyncProcess));
        print('Task Statuses:');
        results.forEach((status) => print(status));
    } catch (error) {
        console.error('Error processing tasks:', error);
    }
};

manageTasks();
