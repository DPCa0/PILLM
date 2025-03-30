 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            user: { name: 'Alice', age: 30 },
            tasks: [
                { id: 1, description: 'Learn JavaScript', completed: false },
                { id: 2, description: 'Practice Yoga', completed: true }
            ]
        });
    }, 1000);
});

 
(async () => {
    try {
        const { user, tasks } = await fetchData();

        const getPendingTasks = (tasks) => tasks.filter(task => !task.completed);

         
        const pendingTasksDescriptions = getPendingTasks(tasks).map(({ id, description }) =>
            `Task ${id}: ${description}`);

         
        print(`Hello, ${user.name} (Age: ${user.age})`);
        print('Your pending tasks:');
        print(pendingTasksDescriptions.join('\n'));
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
