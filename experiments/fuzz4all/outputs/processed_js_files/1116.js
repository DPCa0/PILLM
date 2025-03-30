class Task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.completed = false;
    }
    
    complete() {
        this.completed = true;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function taskManager(tasks) {
    const completionPromises = tasks.map(async (task, index) => {
        print(`Starting task ${index + 1}: ${task.title}`);
        await delay((index + 1) * 1000);  
        task.complete();
        print(`Completed task ${index + 1}: ${task.title}`);
    });

    await Promise.all(completionPromises);
    print('All tasks completed!');
}

const tasks = [
    new Task('Task 1', 'Description of Task 1'),
    new Task('Task 2', 'Description of Task 2'),
    new Task('Task 3', 'Description of Task 3'),
];

taskManager(tasks).then(() => {
    print('Finished managing tasks.');
});
