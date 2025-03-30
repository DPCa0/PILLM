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

class AdvancedCalculator {
    constructor() {
        this.result = 0;
        this.emitter = new EventEmitter();
    }

    on(event, listener) {
        this.emitter.on(event, listener);
    }

    async compute(expression) {
         
        const { evaluate } = await import('https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.5.0/math.js');

        try {
            this.result = evaluate(expression);
            this.emitter.emit('computed', this.result);
        } catch (error) {
            this.emitter.emit('error', error);
        }
    }
}

 
const calculator = new AdvancedCalculator();
calculator.on('computed', result => print(`Result: ${result}`));
calculator.on('error', error => console.error(`Error: ${error.message}`));

(async () => {
    await calculator.compute('3 * (2 + 5) / 7 + sin(45 deg)');
    await calculator.compute('invalid expression');
})();
