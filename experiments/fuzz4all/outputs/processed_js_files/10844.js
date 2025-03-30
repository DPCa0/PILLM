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
            this.events.get(event).forEach(listener => listener(...args));
        }
    }
}

 
const observable = obj => {
    const eventEmitter = new EventEmitter();
    return new Proxy(obj, {
        set(target, property, value) {
            target[property] = value;
            eventEmitter.emit('change', property, value);
            return true;
        },
        get(target, property) {
            if (property === 'onChange') {
                return eventEmitter.on.bind(eventEmitter);
            }
            return target[property];
        }
    });
};

 
const user = observable({ name: 'Alice', age: 30 });

 
user.onChange('change', (prop, value) => {
    print(`Property ${prop} changed to ${value}`);
});

 
const updateUser = ({ name, age, ...rest }) => {
    user.name = name || user.name;
    user.age = age || user.age;
    Object.assign(user, rest);
};

 
async function updateUserData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            updateUser({ name: 'Bob', age: 25, occupation: 'Engineer' });
            resolve('User data updated');
        }, 1000);
    });
}

 
(async () => {
    const message = await updateUserData();
    print(message);
})();
