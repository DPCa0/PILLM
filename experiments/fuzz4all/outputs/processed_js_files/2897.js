class AsyncEventEmitter {
    constructor() {
        this.listeners = new Map();
    }

    on(event, listener) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(listener);
    }

    async emit(event, ...args) {
        if (!this.listeners.has(event)) return;
        const promises = this.listeners.get(event).map(listener => listener(...args));
        await Promise.all(promises);
    }
}

 
function logExecutionTime(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args) {
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        print(`${propertyKey} took ${end - start} ms`);
        return result;
    };
    return descriptor;
}

class ComplexService {
    constructor() {
        this.emitter = new AsyncEventEmitter();
        this.emitter.on('taskCompleted', this.onTaskCompleted);
    }

    @logExecutionTime
    async performComplexTask(input) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        print(`Processing: ${input}`);
        await this.emitter.emit('taskCompleted', input);
    }

    async onTaskCompleted(result) {
        print(`Task completed with result: ${result}`);
    }
}

(async () => {
    const service = new ComplexService();
    await service.performComplexTask('Hello, world!');
})();
