 

 
const apiCall = (result, delay) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.1) resolve(result);
        else reject(new Error('Random API error'));
    }, delay);
});

 
const apiData = {
    user: { id: 1, name: 'Alice' },
    tasks: [
        { id: 101, title: 'Task A', completed: false },
        { id: 102, title: 'Task B', completed: true }
    ],
    metadata: { count: 2 }
};

 
class TaskManager {
    constructor({ user, tasks, metadata }) {
        this.user = user;
        this.tasks = tasks;
        this.metadata = metadata;
    }

    async fetchUserData() {
        try {
            const { user, tasks } = await apiCall(apiData, 1000);
            print(`User: ${user.name}`);

            tasks.forEach(({ id, title, completed }) => {
                print(`Task: ${title}, Completed: ${completed}`);
            });

            const incompleteTasks = tasks.filter(task => !task.completed);
            return incompleteTasks;
        } catch (error) {
            console.error('Failed to fetch user data:', error);
        }
    }
}

 
const manager = new TaskManager(apiData);

 
(async () => {
    const incompleteTasks = await manager.fetchUserData();
    if (incompleteTasks && incompleteTasks.length > 0) {
        print('Incomplete tasks:');
        incompleteTasks.forEach(({ id, title }) => {
            print(`- [${id}] ${title}`);
        });
    } else {
        print('All tasks are completed.');
    }
})();
