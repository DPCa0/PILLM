 

 
class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

     
    async run() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Task ${this.name} completed`);
            }, this.duration);
        });
    }
}

 
async function executeTasks(tasks) {
     
    const taskNames = tasks.map(({ name }) => name).join(', ');
    print(`Starting tasks: ${taskNames}`);

     
    const results = await Promise.all(tasks.map(task => task.run()));

     
    results.forEach(result => print(result));
}

 
const tasks = [
    new Task('A', 2000),
    new Task('B', 1000),
    new Task('C', 1500)
];

 
executeTasks(tasks).then(() => {
    print('All tasks completed');
});
