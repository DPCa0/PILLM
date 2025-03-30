class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    scheduleTask(task, delay) {
        const taskID = Symbol('id');
        this.tasks.push({ id: taskID, fn: task, timeout: delay });
        setTimeout(() => this.runTask(taskID), delay);
        return taskID;
    }

    runTask(taskID) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskID);
        if (taskIndex !== -1) {
            const task = this.tasks[taskIndex];
            task.fn();
            this.tasks.splice(taskIndex, 1);
        }
    }

    cancelTask(taskID) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskID);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
        }
    }

    getPendingTasks() {
        return this.tasks.map(task => task.timeout);
    }
}

 
const taskHandler = {
    get(target, propKey, receiver) {
        if (typeof target[propKey] === 'function') {
            return function (...args) {
                print(`Calling method: ${propKey}, with arguments: ${JSON.stringify(args)}`);
                return target[propKey].apply(this, args);
            }
        }
        return Reflect.get(target, propKey, receiver);
    }
};

const scheduler = new Proxy(new TaskScheduler(), taskHandler);

 
const taskID1 = scheduler.scheduleTask(() => print('Task 1 completed'), 1000);
const taskID2 = scheduler.scheduleTask(() => print('Task 2 completed'), 2000);

print('Pending tasks:', scheduler.getPendingTasks());

 
setTimeout(() => {
    scheduler.cancelTask(taskID1);
    print('Task 1 cancelled');
    print('Pending tasks after cancellation:', scheduler.getPendingTasks());
}, 500);
