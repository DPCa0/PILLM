class Observable {
    constructor() {
        this.subscribers = new Set();
    }
  
    subscribe(callback) {
        this.subscribers.add(callback);
    }
  
    unsubscribe(callback) {
        this.subscribers.delete(callback);
    }
  
    notify(data) {
        this.subscribers.forEach(callback => callback(data));
    }
}

class EnhancedMap extends Map {
    constructor(iterable = []) {
        super(iterable);
        this.observable = new Observable();
    }

    set(key, value) {
        super.set(key, value);
        this.observable.notify({ type: 'set', key, value });
        return this;
    }

    delete(key) {
        const result = super.delete(key);
        if (result) {
            this.observable.notify({ type: 'delete', key });
        }
        return result;
    }
  
    subscribe(callback) {
        this.observable.subscribe(callback);
    }

    unsubscribe(callback) {
        this.observable.unsubscribe(callback);
    }
}

const myMap = new EnhancedMap();
myMap.subscribe(({ type, key, value }) => {
    print(`Operation: ${type}, Key: ${key}, Value: ${value}`);
});

myMap.set('foo', 'bar');   
myMap.set('baz', 42);      
myMap.delete('foo');       
