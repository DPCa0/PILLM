class Task {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
    }
}

const fetchTasks = () =>
    new Promise((resolve) =>
        setTimeout(() => {
            resolve([
                new Task('Complete project', new Date('2023-11-15')),
                new Task('Book flight tickets', new Date('2023-11-10')),
            ]);
        }, 1000)
    );

const showDueSoon = (tasks, threshold = 7) => {
    const now = new Date();
    return tasks.filter((task) => {
        const diff = (task.dueDate - now) / (1000 * 60 * 60 * 24);
        return diff <= threshold;
    });
};

(async () => {
    try {
        const tasks = await fetchTasks();
        const dueSoon = showDueSoon(tasks);
        console.table(
            dueSoon.map((task) => ({
                Title: task.title,
                'Due Date': task.dueDate.toDateString(),
            }))
        );

         
        const extendedTasks = [
            ...tasks,
            ...dueSoon.map((task) => ({
                ...task,
                reminder: 'Set a reminder!',
            })),
        ];

        print('All Extended Tasks:', extendedTasks);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
