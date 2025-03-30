class AsyncProcessor {
    #tasks;
    
    constructor(tasks) {
        this.#tasks = tasks;
    }

    async processTasks() {
        try {
            const results = await Promise.allSettled(this.#tasks.map(task => task()));
            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    print(`Task ${index + 1} succeeded with value:`, result.value);
                } else {
                    console.error(`Task ${index + 1} failed with reason:`, result.reason);
                }
            });
        } catch (error) {
            console.error("An unexpected error occurred:", error);
        }
    }
}

const task1 = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "Data from task 1";
};

const task2 = async () => {
    await new Promise((_, reject) => setTimeout(() => reject(new Error("Task 2 error")), 1500));
};

const task3 = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return "Data from task 3";
};

(async () => {
    const tasks = [task1, task2, task3];
    const processor = new AsyncProcessor(tasks);
    await processor.processTasks();
})();
