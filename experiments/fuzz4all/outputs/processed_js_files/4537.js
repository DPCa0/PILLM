class Robot {
    constructor(name) {
        this.name = name;
    }

    async charge() {
        return new Promise(resolve => setTimeout(resolve, 1000));
    }

    async performTask(task) {
        await this.charge();
        print(`${this.name} is performing: ${task}`);
    }
}

function* taskGenerator(tasks) {
    for (const task of tasks) {
        yield task;
    }
}

(async () => {
    const tasks = ['sweep', 'mop', 'dust'];
    const taskGen = taskGenerator(tasks);
    const robot = new Robot('RoboHelper');

    const taskPromises = [];
    for (const task of taskGen) {
        taskPromises.push(robot.performTask(task));
    }

    await Promise.all(taskPromises);
    print('All tasks completed!');
})();
