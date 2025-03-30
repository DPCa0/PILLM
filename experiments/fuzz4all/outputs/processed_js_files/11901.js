class Observable {
    constructor() {
        this.subscribers = new Map();
    }

    subscribe(event, handler) {
        if (!this.subscribers.has(event)) {
            this.subscribers.set(event, new Set());
        }
        this.subscribers.get(event).add(handler);
    }

    unsubscribe(event, handler) {
        if (this.subscribers.has(event)) {
            this.subscribers.get(event).delete(handler);
        }
    }

    emit(event, data) {
        if (this.subscribers.has(event)) {
            for (const handler of this.subscribers.get(event)) {
                handler(data);
            }
        }
    }
}

class EventDrivenArray extends Array {
    constructor(...elements) {
        super(...elements);
        this.observable = new Observable();
    }

    push(...elements) {
        super.push(...elements);
        this.observable.emit('push', elements);
    }

    pop() {
        const element = super.pop();
        this.observable.emit('pop', element);
        return element;
    }

    async *[Symbol.asyncIterator]() {
        for (const item of this) {
            await new Promise(resolve => setTimeout(resolve, 500));
            yield item;
        }
    }

    on(event, handler) {
        this.observable.subscribe(event, handler);
    }

    off(event, handler) {
        this.observable.unsubscribe(event, handler);
    }
}

async function demo() {
    const arr = new EventDrivenArray(1, 2, 3);

    arr.on('push', (items) => print(`Pushed: ${items}`));
    arr.on('pop', (item) => print(`Popped: ${item}`));

    arr.push(4);
    arr.pop();

    print('Iterating over array:');
    for await (const value of arr) {
        print(value);
    }
}

demo();
