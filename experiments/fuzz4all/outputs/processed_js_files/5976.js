 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncTaskSequence(tasks) {
    for (const task of tasks) {
        yield delay(task).then(() => print(`Task with delay ${task} ms completed`));
    }
}

 
async function executeTasks(tasks) {
    const taskSequence = asyncTaskSequence(tasks);
    for await (const _ of taskSequence) {
         
    }
}

 
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

 
const createLoggingProxy = (target) => new Proxy(target, {
    get: (obj, prop) => {
        print(`Accessing property: ${prop}`);
        return obj[prop];
    }
});

 
const tasks = [1000, 500, 2000, 1500];

 
const executeWithLogging = compose(
    executeTasks,
    createLoggingProxy
);

 
executeWithLogging(tasks);
