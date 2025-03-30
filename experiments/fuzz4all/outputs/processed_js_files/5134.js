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
            for (const listener of this.events.get(event)) {
                listener(...args);
            }
        }
    }
}

async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

const mixin = {
    log() {
        print(`ID: ${this.id}, Name: ${this.name}`);
    }
};

function mix(base, ...mixins) {
    Object.assign(base.prototype, ...mixins);
}

class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}

mix(User, mixin);

(async () => {
    const emitter = new EventEmitter();
    emitter.on('dataFetched', data => {
        const user = new User(data.id, data.name);
        user.log();
    });

    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
        emitter.emit('dataFetched', data);
    } catch (error) {
        console.error(error);
    }
})();
