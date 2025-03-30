class AsyncTaskQueue {
    #tasks = [];
    
    constructor(...tasks) {
        this.#tasks = tasks;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    async executeAll() {
        for (const task of this.#tasks) {
            await task();
        }
    }
}

 
const loggingHandler = {
    apply(target, thisArg, argumentsList) {
        print(`Calling function ${target.name} with arguments:`, argumentsList);
        return target.apply(thisArg, argumentsList);
    }
};

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
    await delay(1000);
    print("Fetched data");
}

async function processData() {
    await delay(500);
    print("Processed data");
}

const proxiedFetchData = new Proxy(fetchData, loggingHandler);
const proxiedProcessData = new Proxy(processData, loggingHandler);

 
const queue = new AsyncTaskQueue(proxiedFetchData, proxiedProcessData);
queue.executeAll().then(() => print("All tasks completed!"));
