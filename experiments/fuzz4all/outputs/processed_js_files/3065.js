class AsyncManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    async runTasksConcurrently() {
        await Promise.all(this.tasks.map(task => task()));
    }
}

const advancedFeaturesDemo = async () => {
    const asyncManager = new AsyncManager();

    const randomDelay = () => Math.floor(Math.random() * 2000);
    
    const taskFactory = (name) => async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                print(`Task ${name} completed`);
                resolve();
            }, randomDelay());
        });
    };

    for (let i = 1; i <= 5; i++) {
        asyncManager.addTask(taskFactory(`A${i}`));
    }

    print("Starting concurrent tasks...");
    await asyncManager.runTasksConcurrently();
    print("All tasks completed!");
};

(async () => {
    try {
        await advancedFeaturesDemo();
    } catch (error) {
        console.error("Error running tasks:", error);
    }
})();
