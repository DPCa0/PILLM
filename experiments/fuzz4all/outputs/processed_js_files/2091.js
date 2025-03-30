class Scheduler {
    #tasks = new Map();

    schedule(taskFn, delay) {
        const id = Symbol();
        const wrapper = async () => {
            try {
                await taskFn();
            } finally {
                this.#tasks.delete(id);
            }
        };
        const timeout = setTimeout(wrapper, delay);
        this.#tasks.set(id, timeout);
        return id;
    }

    cancel(id) {
        if (this.#tasks.has(id)) {
            clearTimeout(this.#tasks.get(id));
            this.#tasks.delete(id);
        }
    }

    cancelAll() {
        for (const timeout of this.#tasks.values()) {
            clearTimeout(timeout);
        }
        this.#tasks.clear();
    }
}

 
const scheduler = new Scheduler();

function asyncTask(message) {
    return new Promise((resolve) => {
        print(`Starting: ${message}`);
        setTimeout(() => {
            print(`Completed: ${message}`);
            resolve();
        }, Math.random() * 1000 + 500);
    });
}

const ids = [
    scheduler.schedule(() => asyncTask('Task 1'), 1000),
    scheduler.schedule(() => asyncTask('Task 2'), 1500),
    scheduler.schedule(() => asyncTask('Task 3'), 2000),
];

setTimeout(() => {
    print('Cancelling Task 2');
    scheduler.cancel(ids[1]);
}, 1200);

setTimeout(() => {
    print('Cancelling All Tasks');
    scheduler.cancelAll();
}, 2500);
