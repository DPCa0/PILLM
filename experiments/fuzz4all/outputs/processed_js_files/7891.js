class AsyncEmitter extends EventTarget {
    constructor() {
        super();
        this.queue = Promise.resolve();
    }

    emitAsync(eventType, detail = {}) {
        return new Promise((resolve) => {
            this.queue = this.queue
                .then(() => new Promise((res) => this.dispatchEvent(new CustomEvent(eventType, { detail, bubbles: true, cancelable: true, composed: true }), res)))
                .then(resolve);
        });
    }

    on(eventType, handler) {
        this.addEventListener(eventType, handler);
    }
}

const emitter = new AsyncEmitter();

async function main() {
    emitter.on('greet', async (event) => {
        const { name } = event.detail;
        print(`Hello, ${name}!`);
        await new Promise(res => setTimeout(res, 1000));   
        print(`Welcome, ${name}!`);
    });

    await emitter.emitAsync('greet', { name: 'Alice' });
    await emitter.emitAsync('greet', { name: 'Bob' });
}

main().catch(console.error);
