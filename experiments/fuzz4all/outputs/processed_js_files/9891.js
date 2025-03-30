 
const eventMixin = {
    on(event, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[event]) this._eventHandlers[event] = [];
        this._eventHandlers[event].push(handler);
    },
    off(event, handler) {
        const handlers = this._eventHandlers?.[event];
        if (!handlers) return;
        this._eventHandlers[event] = handlers.filter(h => h !== handler);
    },
    trigger(event, ...args) {
        if (!this._eventHandlers?.[event]) return;
        this._eventHandlers[event].forEach(handler => handler.apply(this, args));
    }
};

 
class ComplexFeature {
    constructor() {
        return new Proxy(this, {
            get(target, prop, receiver) {
                if (typeof target[prop] === 'function') {
                    return function (...args) {
                        print(`Calling method ${prop} with arguments:`, args);
                        return target[prop].apply(this, args);
                    };
                }
                return Reflect.get(target, prop, receiver);
            }
        });
    }

    @logMethod
    calculate(x, y) {
        return x + y;
    }
}

function logMethod(target, name, descriptor) {
    const original = descriptor.value;
    descriptor.value = function (...args) {
        print(`@logMethod: ${name} called with ${args}`);
        return original.apply(this, args);
    };
    return descriptor;
}

 
Object.assign(ComplexFeature.prototype, eventMixin);

const feature = new ComplexFeature();
feature.on('calculation', result => print('Calculation result:', result));

const result = feature.calculate(5, 10);
feature.trigger('calculation', result);
