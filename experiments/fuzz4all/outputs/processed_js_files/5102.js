 

 
function* asyncTaskGenerator() {
    yield 'task1';
    yield 'task2';
    yield 'task3';
}

 
const asyncTaskRunner = async (task) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(`Completed ${task}`);
            resolve(task);
        }, Math.random() * 1000);
    });
};

 
async function executeTasks(generator) {
    const iterator = generator();

     
    const proxyHandler = {
        get(target, property, receiver) {
            if (property === 'next') {
                return async () => {
                    const { value, done } = Reflect.apply(target[property], target, []);
                    if (!done) {
                        await asyncTaskRunner(value);
                        return receiver.next();
                    }
                    return { done: true };
                };
            }
            return Reflect.get(target, property, receiver);
        }
    };

    const proxiedIterator = new Proxy(iterator, proxyHandler);

     
    await proxiedIterator.next();
}

 
executeTasks(asyncTaskGenerator).then(() => {
    print('All tasks completed');
});
