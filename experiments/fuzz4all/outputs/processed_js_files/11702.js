(async () => {
    const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

    function* fibonacci(n) {
        let [a, b] = [0, 1];
        while (n--) {
            yield a;
            [a, b] = [b, a + b];
        }
    }

    const debounce = (func, delay) => {
        let timeoutId;
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    };

    class EventEmitter {
        constructor() {
            this.events = new Map();
        }
        on(event, listener) {
            if (!this.events.has(event)) this.events.set(event, []);
            this.events.get(event).push(listener);
        }
        emit(event, ...args) {
            const listeners = this.events.get(event);
            if (listeners) listeners.forEach(listener => listener(...args));
        }
    }

    const fetchFibonacci = async (n) => {
        await wait(500);  
        return [...fibonacci(n)];
    };

    const run = async () => {
        print("Fetching Fibonacci sequence...");

        const fibSequence = await fetchFibonacci(10);
        print("Fibonacci:", fibSequence);

        const sum = fibSequence.reduce((a, b) => a + b, 0);
        print("Sum of Fibonacci sequence:", sum);
    };

    const eventEmitter = new EventEmitter();
    eventEmitter.on('start', debounce(run, 300));

    print("Ready. Starting sequence after 1s delay...");
    setTimeout(() => eventEmitter.emit('start'), 1000);
})();
