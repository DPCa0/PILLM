class AsyncQueue {
    constructor() {
        this.queue = [];
        this.pendingPromise = false;
    }

    enqueue(task) {
        this.queue.push(task);
        if (!this.pendingPromise) this.dequeue();
    }

    async dequeue() {
        if (this.queue.length === 0) return;
        
        this.pendingPromise = true;
        const currentTask = this.queue.shift();
        
        try {
            await currentTask();
        } catch (e) {
            console.error('Error executing task:', e);
        }
        
        this.pendingPromise = false;
        if (this.queue.length > 0) this.dequeue();
    }
}

const runAsyncTask = async (id, delay) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            print(`Task ${id} completed`);
            resolve();
        }, delay);
    });
};

const asyncQueue = new AsyncQueue();

 
asyncQueue.enqueue(() => runAsyncTask(1, 1000));
asyncQueue.enqueue(() => runAsyncTask(2, 500));
asyncQueue.enqueue(() => runAsyncTask(3, 1500));
asyncQueue.enqueue(() => runAsyncTask(4, 100));

(async () => {
     
    const targetObj = {
        name: "Proxy Object",
        describe() {
            return `This is a description of ${this.name}.`;
        },
    };

    const handler = {
        get(target, prop, receiver) {
            if (prop === 'describe') {
                return function() {
                    return Reflect.get(target, prop, receiver)() + " Accessed via Proxy.";
                };
            }
            return Reflect.get(target, prop, receiver);
        },
    };

    const proxyObj = new Proxy(targetObj, handler);

    print(proxyObj.name);
    print(proxyObj.describe());

     
    function* idGenerator() {
        let id = 0;
        while (true) {
            yield id++;
        }
    }

    const gen = idGenerator();
    print(gen.next().value);  
    print(gen.next().value);  
    print(gen.next().value);  
})();
