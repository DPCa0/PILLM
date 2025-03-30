class Observer {
    constructor() {
        this.subscribers = new Set();
    }
    
    subscribe(fn) {
        this.subscribers.add(fn);
    }

    unsubscribe(fn) {
        this.subscribers.delete(fn);
    }

    notify(data) {
        this.subscribers.forEach(subscriber => subscriber(data));
    }
}

class ReactiveObject {
    constructor(obj) {
        return new Proxy(obj, {
            set: (target, prop, value) => {
                if (target[prop] !== value) {
                    target[prop] = value;
                    this.observer.notify({ prop, value });
                }
                return true;
            }
        });
    }

    observer = new Observer();
    
    onChange(callback) {
        this.observer.subscribe(callback);
    }
}

 
const reactive = new ReactiveObject({ x: 10, y: 20 });

reactive.onChange(({ prop, value }) => {
    print(`Property ${prop} changed to ${value}`);
});

reactive.x = 30;  
reactive.y = 50;  

const computeArea = ({ x, y }) => x * y;
print(`Area: ${computeArea(reactive)}`);  

const debounce = (func, wait) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
};

const optimizedResize = debounce(() => {
    print('Window resized');
}, 300);

window.addEventListener('resize', optimizedResize);
