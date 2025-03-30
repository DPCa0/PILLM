 
class Reactive {
    constructor() {
        this._listeners = new Set();
    }

     
    subscribe(listener) {
        this._listeners.add(listener);
    }

     
    notify(data) {
        this._listeners.forEach(listener => listener(data));
    }
}

 
function createReactiveObject(obj) {
    const reactiveSystem = new Reactive();
    return new Proxy(obj, {
        set(target, property, value) {
            target[property] = value;
            reactiveSystem.notify({ property, value });
            return true;
        }
    });
}

 
const state = createReactiveObject({ count: 0, text: 'Hello' });

 
state.subscribe(change => {
    print(`Property ${change.property} changed to ${change.value}`);
});

 
async function* stateUpdater() {
    const updates = [
        { count: 1, delay: 1000 },
        { count: 2, delay: 2000 },
        { text: 'World', delay: 1500 },
    ];
    for (let update of updates) {
        await new Promise(resolve => setTimeout(resolve, update.delay));
        yield update;
    }
}

 
(async () => {
    for await (let update of stateUpdater()) {
        Object.assign(state, update);
    }
})();
