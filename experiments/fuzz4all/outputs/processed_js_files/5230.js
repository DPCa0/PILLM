 

 
function* generateTasks() {
    yield "Task 1";
    yield "Task 2";
    yield "Task 3";
}

 
function completeTask(task) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Completed: ${task}`);
        }, Math.random() * 1000);
    });
}

 
async function processTasks(generator) {
    for (let task of generator) {
        const result = await completeTask(task);
        print(result);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Property '${property}' accessed.`);
        return target[property];
    }
};

 
const tasks = {
    task1: "Learn Promises",
    task2: "Learn Async/Await",
    task3: "Learn Proxy"
};

 
const proxyTasks = new Proxy(tasks, handler);

 
print(proxyTasks.task1);
print(proxyTasks.task2);

 
const taskGenerator = generateTasks();
processTasks(taskGenerator);
