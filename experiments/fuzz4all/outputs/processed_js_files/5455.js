class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;  
    }
    
    async execute() {
        print(`Starting task: ${this.name}`);
        return new Promise(resolve => setTimeout(() => {
            print(`Finished task: ${this.name}`);
            resolve(this.name);
        }, this.duration));
    }
}

const tasks = [
    new Task('Task 1', 1000),
    new Task('Task 2', 2000),
    new Task('Task 3', 500)
];

async function executeAll() {
    let results = await Promise.all(tasks.map(task => task.execute()));
    print(`All tasks completed: ${results}`);
}

(async function main() {
    try {
        print('Running tasks...');
        await executeAll();
        print('All done!');
    } catch (error) {
        console.error('Error executing tasks:', error);
    }
})();
