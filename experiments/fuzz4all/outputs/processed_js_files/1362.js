class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, listener) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event).push(listener);
    }

    emit(event, ...args) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

const asyncAdd = async (a, b) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(a + b), 1000);
    });
};

const advancedCalculation = async (nums) => {
    const results = await Promise.all(nums.map(async (num, index) => {
        const incremented = await asyncAdd(num, index);
        return incremented ** 2;
    }));

    return results.reduce((acc, val) => acc + val, 0);
};

(async () => {
    const eventEmitter = new EventEmitter();
    eventEmitter.on('calculationComplete', result => {
        print(`Total: ${result}`);
    });

    const randomNumbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
    print(`Calculating with numbers: ${randomNumbers}`);

    const result = await advancedCalculation(randomNumbers);
    eventEmitter.emit('calculationComplete', result);
})();
