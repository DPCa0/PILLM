class AsyncTimer {
    constructor() {
        this.timeouts = [];
    }

    schedule(delay, action) {
        const timeout = setTimeout(() => {
            action();
            this.timeouts = this.timeouts.filter(t => t !== timeout);
        }, delay);
        this.timeouts.push(timeout);
    }

    clearAll() {
        this.timeouts.forEach(timeout => clearTimeout(timeout));
        this.timeouts = [];
    }
}

const asyncIterable = {
    async *[Symbol.asyncIterator]() {
        const timer = new AsyncTimer();
        const actions = [
            () => console.log('Action 1 executed'),
            () => console.log('Action 2 executed'),
            () => console.log('Action 3 executed')
        ];

        for (let i = 0; i < actions.length; i++) {
            timer.schedule(1000 * (i + 1), actions[i]);
            await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            yield `Action ${i + 1} scheduled`;
        }

        timer.clearAll();
    }
};

(async () => {
    for await (const message of asyncIterable) {
        print(message);
    }
})();
