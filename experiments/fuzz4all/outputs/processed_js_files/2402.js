class Task {
    #title;  
    #completed = false;

    constructor(title) {
        this.#title = title;
    }

    get title() {
        return this.#title;
    }

    set title(newTitle) {
        if (typeof newTitle === 'string' && newTitle.trim()) {
            this.#title = newTitle;
        } else {
            throw new Error('Title must be a non-empty string');
        }
    }

    toggle() {
        this.#completed = !this.#completed;
    }

    get isCompleted() {
        return this.#completed;
    }

    static async fetchTasks(apiEndpoint) {
        try {
            const response = await fetch(apiEndpoint);
            const tasks = await response.json();
            return tasks.map(taskData => new Task(taskData.title));
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
            return [];
        }
    }
}

(async () => {
    const taskList = await Task.fetchTasks('https://jsonplaceholder.typicode.com/todos');
    const [firstTask] = taskList;
    
    if (firstTask) {
        print(`First Task: ${firstTask.title}, Completed: ${firstTask.isCompleted}`);
        firstTask.toggle();
        print(`First Task Toggled: ${firstTask.isCompleted}`);
    }
})();
