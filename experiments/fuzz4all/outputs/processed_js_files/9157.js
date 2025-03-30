 

 
const mixin = (target, ...sources) => Object.assign(target.prototype, ...sources);

 
const EventEmitterMixin = {
    on(event, listener) {
        if (!this._listeners) this._listeners = {};
        if (!this._listeners[event]) this._listeners[event] = [];
        this._listeners[event].push(listener);
    },
    emit(event, ...args) {
        if (this._listeners && this._listeners[event]) {
            this._listeners[event].forEach(listener => listener.apply(this, args));
        }
    }
};

 
const LoggerMixin = {
    log(message) {
        print(`[${new Date().toISOString()}] ${message}`);
    }
};

 
class ComplexApp {
    constructor(name) {
        this.name = name;
        this.log(`App ${name} created.`);
    }

    static createApp(name) {
        return new ComplexApp(name);
    }
}

 
mixin(ComplexApp, EventEmitterMixin, LoggerMixin);

 
const appHandler = {
    get(target, prop) {
        if (prop === 'status') {
            return `App ${target.name} is running smoothly.`;
        }
        return Reflect.get(target, prop);
    }
};

 
async function* asyncLogger(app) {
    let count = 0;
    while (count < 3) {
        app.log(`Logging asynchronously ${++count}`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield;
    }
}

 
const app = ComplexApp.createApp('ComplexApp');

 
const proxiedApp = new Proxy(app, appHandler);

 
proxiedApp.on('start', () => proxiedApp.log('App has started'));
proxiedApp.emit('start');

 
print(proxiedApp.status);

 
(async () => {
    for await (const _ of asyncLogger(proxiedApp)) {
         
    }
})();
