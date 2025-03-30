class PubSub {
    constructor() {
        this.events = {};
    }
    subscribe(event, listener) {
        if (!this.events[event]) {
            this.events[event] = { listeners: new Set() };
        }
        this.events[event].listeners.add(listener);
    }
    unsubscribe(event, listener) {
        if (this.events[event]) {
            this.events[event].listeners.delete(listener);
        }
    }
    publish(event, data) {
        if (this.events[event]) {
            this.events[event].listeners.forEach(listener => listener(data));
        }
    }
}

class AsyncChain {
    constructor(value) {
        this.promise = Promise.resolve(value);
    }
    then(fn) {
        this.promise = this.promise.then(fn);
        return this;
    }
    catch(fn) {
        this.promise = this.promise.catch(fn);
        return this;
    }
    finally(fn) {
        this.promise = this.promise.finally(fn);
        return this;
    }
}

const pipeline = new AsyncChain('Hello')
    .then(str => `${str}, World!`)
    .then(str => str.toUpperCase())
    .catch(err => console.error('Error:', err))
    .finally(() => print('Process finished'));

const pubSub = new PubSub();

const sayHello = (name) => print(`Hello, ${name}!`);
const sayGoodbye = (name) => print(`Goodbye, ${name}!`);

pubSub.subscribe('greet', sayHello);
pubSub.subscribe('farewell', sayGoodbye);

setTimeout(() => pubSub.publish('greet', 'Alice'), 1000);
setTimeout(() => pubSub.publish('farewell', 'Bob'), 2000);
