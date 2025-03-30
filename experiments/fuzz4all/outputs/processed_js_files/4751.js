class Task {
    #id;
    #title;
    #completed;

    constructor(title) {
        this.#id = Task.generateId();
        this.#title = title;
        this.#completed = false;
    }

    static #currentId = 0;
    static generateId() {
        return ++this.#currentId;
    }

    toggle() {
        this.#completed = !this.#completed;
    }

    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            completed: this.#completed
        };
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
    const tasks = [new Task('Learn JavaScript'), new Task('Practice Coding'), new Task('Contribute to Open Source')];

    for (const task of tasks) {
        await delay(1000);  
        print(`Task ${task.toJSON().id}: ${task.toJSON().title} - Completed: ${task.toJSON().completed}`);
        task.toggle();
    }

    print('\nAll tasks toggled:\n');
    tasks.map(task => print(`Task ${task.toJSON().id}: ${task.toJSON().title} - Completed: ${task.toJSON().completed}`));
})();
