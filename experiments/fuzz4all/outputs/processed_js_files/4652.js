class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
    }

    async execute() {
        print(`Starting task: ${this.name}`);
        await new Promise(resolve => setTimeout(resolve, this.duration));
        print(`Completed task: ${this.name}`);
    }
}

const tasks = [
    new Task('Download Data', 1000),
    new Task('Process Data', 2000),
    new Task('Upload Results', 1500)
];

(async () => {
    for await (const task of tasks) {
        await task.execute();
    }

    const finalStatus = await Promise.allSettled(tasks.map(task => task.execute()));
    const summary = finalStatus.reduce((acc, result) => {
        acc[result.status] = (acc[result.status] || 0) + 1;
        return acc;
    }, {});

    print(`Summary:`, summary);
})();

const proxyHandler = {
    get: (target, property) => {
        if (property in target) {
            return target[property];
        } else {
            return `Property '${property}' does not exist.`;
        }
    }
};

const settings = {
    theme: "dark",
    version: "1.2.3",
    showHints: true
};

const settingsProxy = new Proxy(settings, proxyHandler);

print(settingsProxy.theme);        
print(settingsProxy.missingProp);  
