class Observable {
    constructor() {
        this.subscribers = new Set();
    }

    subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
    }

    notify(data) {
        this.subscribers.forEach(fn => fn(data));
    }
}

const useState = (initialValue) => {
    let state = initialValue;
    const observable = new Observable();

    return [
        () => state,
        (newValue) => {
            if (state !== newValue) {
                state = newValue;
                observable.notify(state);
            }
        },
        observable.subscribe.bind(observable)
    ];
}

const [getCount, setCount, onCountChange] = useState(0);

onCountChange((newCount) => {
    print(`Count changed to ${newCount}`);
});

setCount(1);  
setCount(2);  

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function incrementCountAfterDelay() {
    await delay(1000);
    setCount(getCount() + 1);
}

incrementCountAfterDelay();  
