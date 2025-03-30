class Scheduler {
    constructor() {
        this.tasks = [];
    }

    async addTask(taskFunc, delay) {
        const task = new Promise((resolve) => {
            setTimeout(() => {
                resolve(taskFunc());
            }, delay);
        });

        this.tasks.push(task);
        await task;  
    }

    async runSequentially() {
        for (const task of this.tasks) {
            await task;  
        }
    }
}

function delayTask(id) {
    print(`Task ${id} is starting`);
    return new Promise(resolve => setTimeout(() => {
        print(`Task ${id} completed`);
        resolve(id);
    }, 1000));
}

(async () => {
    const scheduler = new Scheduler();

     
    const { default: dynamicFunc } = await import('./dynamicModule.js').catch(() => ({ default: () => 'Fallback' }));

    await scheduler.addTask(() => delayTask(1), 500);
    await scheduler.addTask(() => delayTask(2), 1500);

     
    function* generatorTasks() {
        yield scheduler.addTask(() => delayTask(3), 1000);
        yield scheduler.addTask(() => dynamicFunc?.(), 500);  
    }

    for (const genTask of generatorTasks()) {
        await genTask;
    }

     
    await Promise.all([
        scheduler.addTask(() => delayTask(4), 2000),
        scheduler.addTask(() => delayTask(5), 2500)
    ]);

    print('All tasks scheduled. Running sequential execution:');
    await scheduler.runSequentially();
})();
