class TaskScheduler {
    constructor() {
        this.tasks = [];
    }

    addTask(delay, task) {
        const executeTask = async () => {
            await new Promise(resolve => setTimeout(resolve, delay));
            try {
                print(`Task ${task.name} started.`);
                await task();
                print(`Task ${task.name} completed.`);
            } catch (error) {
                console.error(`Error in task ${task.name}:`, error);
            }
        };
        this.tasks.push(executeTask);
    }

    async run() {
        print('Starting all tasks...');
        await Promise.allSettled(this.tasks.map(task => task()));
        print('All tasks finished.');
    }
}

function fetchData(url) {
    return async function fetchDataTask() {
        const response = await fetch(url);
        const data = await response.json();
        print('Fetched data:', data);
    };
}

async function complexCalculation() {
    print('Complex calculation started.');
     
    const result = [...Array(1000000).keys()].reduce((acc, val) => acc + val, 0);
    print('Complex calculation result:', result);
}

function logTask(message) {
    return function logTaskFunction() {
        print(message);
    };
}

const scheduler = new TaskScheduler();
scheduler.addTask(1000, fetchData('https://jsonplaceholder.typicode.com/todos/1'));
scheduler.addTask(500, complexCalculation);
scheduler.addTask(200, logTask('This is a simple logging task.'));
scheduler.run();
