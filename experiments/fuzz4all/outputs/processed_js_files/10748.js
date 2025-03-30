 

function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const handler = {
    get(target, prop) {
        if (prop === 'addTask') {
            return async (task) => {
                const taskId = target.idGen.next().value;
                print(`Starting task ${taskId}: ${task.name}`);
                await delay(1000);
                const result = await task();
                print(`Finished task ${taskId}: Result - ${result}`);
                target.completedTasks.push({ taskId, result });
            };
        }
        if (prop === 'getCompletedTasks') {
            return () => target.completedTasks;
        }
        return Reflect.get(target, prop);
    }
};

const taskManager = new Proxy({
    idGen: idGenerator(),
    completedTasks: []
}, handler);

async function example() {
    await taskManager.addTask(async () => 'Task 1 complete');
    await taskManager.addTask(async () => {
        await delay(500);
        return 'Task 2 complete';
    });

    const completed = taskManager.getCompletedTasks();
    print('All completed tasks:', completed);
}

example();
