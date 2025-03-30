class AsyncTask {
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static async runTask(id, time) {
        print(`Task ${id} started`);
        await AsyncTask.delay(time);
        print(`Task ${id} completed`);
    }
}

(async () => {
    const taskList = Array.from({ length: 5 }, (_, i) => AsyncTask.runTask(i + 1, (i + 1) * 1000));

    const results = await Promise.all(taskList);

    const proxyHandler = {
        get(target, property) {
            return property in target ? target[property] : `Property ${property} not found`;
        },
        set(target, property, value) {
            if (property.startsWith('_')) {
                throw new Error("Private property cannot be modified");
            }
            target[property] = value;
            return true;
        }
    };

    const taskManager = new Proxy({ tasks: taskList }, proxyHandler);

    print(taskManager.tasks);

    try {
        taskManager._secret = 'hidden value';
    } catch (error) {
        console.error(error.message);
    }

    print(taskManager.nonExistentProperty);
})();
