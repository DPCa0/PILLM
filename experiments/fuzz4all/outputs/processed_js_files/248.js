class AsyncManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    async runAll() {
        await Promise.all(this.tasks.map(task => task()));
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    return await response.json();
}

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const idGen = idGenerator();

const asyncManager = new AsyncManager();

asyncManager.addTask(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print(`Task ${idGen.next().value}:`, data);
});

asyncManager.addTask(async () => {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/2');
    print(`Task ${idGen.next().value}:`, data);
});

(async () => {
    print('Running all tasks concurrently...');
    await asyncManager.runAll();
    print('All tasks completed.');
})();
