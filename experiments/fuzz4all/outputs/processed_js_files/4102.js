class Task {
    constructor(name, delay) {
        this.name = name;
        this.delay = delay;
    }

    async run() {
        return new Promise((resolve) => {
            setTimeout(() => {
                print(`Task "${this.name}" completed after ${this.delay}ms`);
                resolve();
            }, this.delay);
        });
    }
}

const taskManager = {
    tasks: [],
    
    addTask(task) {
        this.tasks.push(task);
        return this;  
    },

    async executeAll() {
        for (const task of this.tasks) {
            await task.run();
        }
    }
};

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        print('Fetched data:', data);
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
};

const tasks = [
    new Task('task1', 1000),
    new Task('task2', 500),
    new Task('task3', 1500)
];

(async () => {
    taskManager
        .addTask(tasks[0])
        .addTask(tasks[1])
        .addTask(tasks[2]);

    print('Starting task execution');
    await taskManager.executeAll();
    print('All tasks completed');

    const url = 'https://api.github.com';
    await fetchData(url);
})();
