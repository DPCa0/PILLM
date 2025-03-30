 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* taskGenerator() {
    yield asyncTask("Task 1", 1000);
    yield asyncTask("Task 2", 500);
    yield asyncTask("Task 3", 2000);
}

 
async function asyncTask(name, duration) {
    print(`${name} started`);
    await delay(duration);
    print(`${name} completed`);
    return `${name} result`;
}

 
async function executeTasks() {
    const tasks = taskGenerator();
    for (let task of tasks) {
        const result = await task;
        print(`Result: ${result}`);
    }
}

 
executeTasks().then(() => print("All tasks executed successfully"));
