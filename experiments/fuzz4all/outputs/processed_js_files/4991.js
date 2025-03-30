class ReactiveValue {
    constructor(value) {
        this._value = value;
        this._subscribers = new Set();
    }
  
    get value() {
        return this._value;
    }
  
    set value(newValue) {
        if (newValue !== this._value) {
            this._value = newValue;
            this.notify();
        }
    }
  
    subscribe(callback) {
        this._subscribers.add(callback);
        return () => this._subscribers.delete(callback);
    }
  
    notify() {
        this._subscribers.forEach(callback => callback(this._value));
    }
}

const createReactiveObject = (obj) => {
    return new Proxy(obj, {
        get(target, prop, receiver) {
            if (prop in target) {
                return target[prop].value;
            }
        },
        set(target, prop, value, receiver) {
            if (prop in target) {
                target[prop].value = value;
            }
            return true;
        }
    });
};

 
const reactive = {
    name: new ReactiveValue('World'),
    age: new ReactiveValue(25)
};

const user = createReactiveObject(reactive);

const unsubscribeName = reactive.name.subscribe(newValue => {
    print(`Name changed to: ${newValue}`);
});

user.name = 'Alice';  
unsubscribeName();
user.name = 'Bob';  

 
const fetchData = () => Promise.resolve({ id: 1, title: 'Reactive Programming' });

async function loadData() {
    const { title } = await fetchData();
    print(`Fetched title: ${title}`);
}

loadData();  
