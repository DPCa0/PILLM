class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }
    
    async complete() {
        print(`${this.name} started...`);
        await new Promise(resolve => setTimeout(resolve, this.duration));
        print(`${this.name} completed!`);
    }
}

const taskPipeline = {
    tasks: [],
    
    add(task) {
        this.tasks.push(task);
        return this;  
    },
    
    async run() {
        for (const task of this.tasks) {
            await task.complete();
        }
    }
};

 
const taskCreator = new Proxy({}, {
    get(target, prop) {
        return (duration) => new Task(prop, duration);
    }
});

 
async function main() {
    await taskPipeline
        .add(taskCreator.FetchData(2000))
        .add(taskCreator.ProcessData(3000))
        .add(taskCreator.SaveData(1000))
        .run();
    
    print("All tasks are done!");
}

main().catch(console.error);
