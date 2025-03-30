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

const asyncIterable = {
    [Symbol.asyncIterator]: async function* () {
        for (let i = 1; i <= 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield i;
        }
    }
};

const calculateFactorial = async (num) => {
    const factorial = num => num <= 1 ? 1 : num * factorial(num - 1);
    const result = await new Promise((resolve, reject) => {
        try {
            const fact = factorial(num);
            resolve(fact);
        } catch (error) {
            reject(error);
        }
    });
    return result;
};

(async function main() {
    const eventEmitter = new EventEmitter();

    eventEmitter.on('data', data => {
        print(`Received data: ${data}`);
    });

    eventEmitter.on('factorial', async num => {
        try {
            const result = await calculateFactorial(num);
            print(`Factorial of ${num} is ${result}`);
        } catch (error) {
            console.error('Error calculating factorial:', error);
        }
    });

    for await (const num of asyncIterable) {
        eventEmitter.emit('data', num);
        eventEmitter.emit('factorial', num);
    }
})();
