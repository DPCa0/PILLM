 
const { EventEmitter } = require('events');

 
async function* asyncGenerator(max) {
    let i = 0;
    while (i < max) {
         
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i++;
    }
}

 
class ComplexEmitter extends EventEmitter {
    constructor(maxCount) {
        super();
        this.maxCount = maxCount;
        this.setup();
    }

    async setup() {
        try {
             
            this.maxCount ||= 5;

             
            for await (const count of asyncGenerator(this.maxCount)) {
                this.emit('count', count);
            }
            this.emit('completed', 'Counting completed successfully!');
        } catch (err) {
            this.emit('error', err?.message ?? 'Unknown error occurred');
        }
    }
}

 
const handler = {
    get(target, prop) {
        print(`Accessed property: ${prop}`);
        return target[prop];
    }
};

const complexEmitter = new ComplexEmitter(10);
const proxiedEmitter = new Proxy(complexEmitter, handler);

 
const eventHandlers = new Map();

eventHandlers.set('count', count => print(`Count: ${count}`));
eventHandlers.set('completed', message => print(`Event: ${message}`));
eventHandlers.set('error', message => console.error(`Error: ${message}`));

 
for (const [event, handler] of eventHandlers.entries()) {
    proxiedEmitter.on(event, handler);
}
