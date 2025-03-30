class Emitter {
    #events = new Map();

    on(event, listener) {
        if (!this.#events.has(event)) {
            this.#events.set(event, []);
        }
        this.#events.get(event).push(listener);
    }

    off(event, listener) {
        if (this.#events.has(event)) {
            const listeners = this.#events.get(event);
            this.#events.set(event, listeners.filter(l => l !== listener));
        }
    }

    emit(event, ...args) {
        if (this.#events.has(event)) {
            this.#events.get(event).forEach(listener => listener(...args));
        }
    }
}

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const withLogging = targetFunction => {
    return (...args) => {
        print(`Arguments: ${JSON.stringify(args)}`);
        const result = targetFunction(...args);
        print(`Result: ${JSON.stringify(result)}`);
        return result;
    };
};

(async function main() {
    const emitter = new Emitter();

    emitter.on('data', debounce(withLogging(data => {
        print(`Received data: ${data}`);
    }), 300));

    for (let i = 0; i < 5; i++) {
        emitter.emit('data', `data ${i}`);
        await new Promise(res => setTimeout(res, 100));
    }
})();
