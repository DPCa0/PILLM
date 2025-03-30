 
const asyncProcess = async (task, delay) => {
    return new Promise(resolve => {
        setTimeout(() => {
            print(`Task ${task} completed after ${delay}ms`);
            resolve(task);
        }, delay);
    });
};

 
const range = (size) => [...Array(size).keys()];

 
const handler = {
    get: (target, property) => {
        print(`Accessing property ${property}`);
        return target[property];
    }
};

const target = {
    data: range(5).map(num => num * 10)
};

const proxy = new Proxy(target, handler);

 
(async () => {
    print('Starting tasks...');
    
    const tasks = proxy.data.map(async (num) => {
        const taskName = `Task-${num}`;
        return asyncProcess(taskName, Math.floor(Math.random() * 2000));
    });
    
    await Promise.all(tasks);
    print('All tasks completed');
})();
