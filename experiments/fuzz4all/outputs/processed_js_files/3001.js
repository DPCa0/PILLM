 

 
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

 
async function asyncTask(taskName, ms) {
    print(`Starting ${taskName}`);
    await delay(ms);
    print(`Finished ${taskName}`);
    return `${taskName} completed`;
}

 
function* taskGenerator() {
    yield asyncTask("Task 1", 1000);
    yield asyncTask("Task 2", 500);
    yield asyncTask("Task 3", 2000);
}

 
const taskProxyHandler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}"`);
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist`);
            return undefined;
        }
    }
};

 
async function main() {
    const tasks = taskGenerator();
    const taskArray = [...tasks];
    
    const taskResults = [];

    for (let taskPromise of taskArray) {
        const result = await taskPromise;
        taskResults.push(result);
    }

     
    const proxiedResults = new Proxy(taskResults, taskProxyHandler);

     
    print(proxiedResults[0]);  
    print(proxiedResults[10]);  

    print('All tasks completed:', proxiedResults);
}

 
main().catch(console.error);
