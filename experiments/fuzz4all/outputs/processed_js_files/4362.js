class TaskQueue {
    constructor(concurrency) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }

    pushTask(task) {
        this.queue.push(task);
        this.next();
    }

    next() {
        if (this.running < this.concurrency && this.queue.length) {
            const task = this.queue.shift();
            this.running++;
            task().then(() => {
                this.running--;
                this.next();
            });
        }
    }
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const delayTask = (name, ms) => async () => {
    print(`Starting task ${name}`);
    await timeout(ms);
    print(`Completed task ${name}`);
};

const queue = new TaskQueue(2);

['A', 'B', 'C', 'D', 'E'].forEach((task, i) => {
    queue.pushTask(delayTask(task, 1000 + i * 500));
});

 
async function* asyncGenerator() {
    yield 'Hello';
    yield 'from';
    yield 'an';
    yield 'async';
    yield 'generator';
}

(async () => {
    for await (const word of asyncGenerator()) {
        print(word);
    }
})();

 
const validator = {
    set: function(obj, prop, value) {
        if (prop === 'age') {
            if (!Number.isInteger(value)) {
                throw new TypeError('Age must be an integer');
            }
            if (value < 0) {
                throw new RangeError('Age must be non-negative');
            }
        }
        obj[prop] = value;
        return true;
    }
};

const person = new Proxy({}, validator);

try {
    person.age = 25;
    print(`Age is set to: ${person.age}`);
    person.age = 'twenty-five';
} catch (e) {
    console.error(e.message);
}
