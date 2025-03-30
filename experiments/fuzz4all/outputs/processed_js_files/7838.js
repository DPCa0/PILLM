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
            this.events.get(event).forEach(listener => listener.apply(this, args));
        }
    }
}

 
const privateStateHandler = {
    get(target, property) {
        if (property.startsWith('_')) {
            throw new Error('Access denied');
        }
        return target[property];
    },
    set(target, property, value) {
        if (property.startsWith('_')) {
            throw new Error('Access denied');
        }
        target[property] = value;
        return true;
    }
};

class SecretBox {
    constructor(secret) {
        this._secret = secret;
        return new Proxy(this, privateStateHandler);
    }

    revealSecret() {
        return this._secret;
    }
}

 
async function* asyncNumbers() {
    for (let i = 1; i <= 5; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

(async () => {
     
    const emitter = new EventEmitter();
    emitter.on('greet', name => print(`Hello, ${name}!`));
    emitter.emit('greet', 'world');

     
    const box = new SecretBox('top secret');
    try {
        print(box._secret);   
    } catch (e) {
        console.error(e.message);
    }
    print(box.revealSecret());

     
    for await (const num of asyncNumbers()) {
        print(num);
    }
})();
