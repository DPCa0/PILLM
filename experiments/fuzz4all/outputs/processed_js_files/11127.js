 
const uniqueKey = Symbol('unique');

 
class ComplexClass {
    #internalState = new WeakMap();

    constructor(name) {
         
        this[uniqueKey] = name;
        this.#internalState.set(this, { counter: 0 });
    }

     
    incrementAndLog() {
        let state = this.#internalState.get(this);
        state.counter++;
        print(`Hello, ${this[uniqueKey]}! The count is now: ${state.counter}`);
    }

     
    *numberSequence() {
        for (let i = 1; i <= 3; i++) {
            yield i * this.#internalState.get(this).counter;
        }
    }
}

 
const complexInstance = new ComplexClass('AdvancedUser');

 
const handler = {
    get(target, prop, receiver) {
        if (typeof target[prop] === 'function') {
            return function (...args) {
                print(`Calling method: ${prop}`);
                return target[prop].apply(receiver, args);
            };
        }
        return Reflect.get(target, prop, receiver);
    }
};

const proxiedComplexInstance = new Proxy(complexInstance, handler);

 
proxiedComplexInstance.incrementAndLog();
proxiedComplexInstance.incrementAndLog();

 
const sequence = [...proxiedComplexInstance.numberSequence()];
print(`Generated sequence: ${sequence.join(', ')}`);

 
(async () => {
    const delayedLog = (message) => new Promise(resolve => setTimeout(() => {
        print(message);
        resolve();
    }, 1000));

    await delayedLog('This is a delayed message!');
})();
