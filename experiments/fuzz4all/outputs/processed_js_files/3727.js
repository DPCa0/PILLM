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

const asyncOperation = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data) {
                resolve(`Processed: ${data}`);
            } else {
                reject('No data received');
            }
        }, 1000);
    });
};

const main = async () => {
    const emitter = new EventEmitter();
    
    emitter.on('start', async (input) => {
        try {
            const result = await asyncOperation(input);
            print(result);
            emitter.emit('completed', result);
        } catch (error) {
            console.error(error);
            emitter.emit('error', error);
        }
    });

    emitter.on('completed', (result) => {
        print(`Operation completed successfully: ${result}`);
    });

    emitter.on('error', (error) => {
        console.error(`Operation failed with error: ${error}`);
    });

    emitter.emit('start', 'Hello, advanced JavaScript!');
};

main();
