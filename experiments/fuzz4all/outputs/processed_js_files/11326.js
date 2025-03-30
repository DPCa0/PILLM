 
const asyncTask = async (taskId) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            Math.random() > 0.1 ? resolve(`Task ${taskId} completed`) : reject(`Task ${taskId} failed`);
        }, Math.random() * 2000);
    });
};

 
const executeTasksConcurrently = async (tasks) => {
    try {
        const results = await Promise.all(tasks.map(asyncTask));
        print('All tasks completed successfully:', results);
    } catch (error) {
        console.error('Error executing tasks:', error);
    }
};

 
const executeTasksSequentially = async (tasks) => {
    const results = [];
    for (const task of tasks) {
        try {
            const result = await asyncTask(task);
            results.push(result);
            print(result);
        } catch (error) {
            console.error('Error executing task:', error);
        }
    }
    print('Sequential task execution completed:', results);
};

 
function* generateTasks(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}

 
(async () => {
    print('Starting concurrent execution:');
    await executeTasksConcurrently([...generateTasks(5)]);

    print('Starting sequential execution:');
    await executeTasksSequentially([...generateTasks(5)]);
})();
