class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

 
const traceAccess = obj => new Proxy(obj, {
    get(target, prop, receiver) {
        print(`Accessed property: ${String(prop)}`);
        return Reflect.get(target, prop, receiver);
    }
});

 
class Task {
    #status;
    constructor(description) {
        this.description = description;
        this.#status = 'pending';
    }

    static fromJSON(json) {
        const data = JSON.parse(json);
        return new Task(data.description);
    }

    complete() {
        this.#status = 'completed';
        Task.events.emit('completed', this);
    }

    get status() {
        return this.#status;
    }
}

Task.events = new EventEmitter();
Task.events.on('completed', task => print(`Task "${task.description}" completed!`));

const myTask = Task.fromJSON('{"description": "Learn advanced JavaScript"}');
const tracedTask = traceAccess(myTask);

print(tracedTask.status);  
myTask.complete();
