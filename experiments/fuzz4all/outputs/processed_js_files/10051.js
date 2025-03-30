class ReactiveObject {
    constructor(initialState) {
        this.state = new Proxy(initialState, {
            set: (target, property, value) => {
                print(`State change: ${property} => ${value}`);
                target[property] = value;
                this.listeners.forEach(listener => listener(target));
                return true;
            }
        });
        this.listeners = new Set();
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);  
    }

    setState(newState) {
        Object.assign(this.state, newState);
    }
}

 
async function* asyncNumbers(max) {
    for (let i = 0; i <= max; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        yield i;
    }
}

 
(async () => {
    const reactiveObj = new ReactiveObject({ count: 0 });

    reactiveObj.subscribe(state => {
        print(`Current state: ${JSON.stringify(state)}`);
    });

    for await (const num of asyncNumbers(5)) {
        reactiveObj.setState({ count: num });
    }

    const arr = [1, 2, 3, 4, 5];
    const newArr = arr.flatMap(x => [x, x * 2]);  
    print(`Original array: ${arr}, New array: ${newArr}`);
})();
