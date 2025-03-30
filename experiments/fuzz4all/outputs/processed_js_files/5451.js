class Observable {
    constructor(value) {
        this._value = value;
        this._listeners = new Set();
    }

    subscribe(listener) {
        this._listeners.add(listener);
        listener(this._value);
        return () => this._listeners.delete(listener);
    }

    notify() {
        this._listeners.forEach(listener => listener(this._value));
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        if (this._value !== newValue) {
            this._value = newValue;
            this.notify();
        }
    }
}

const obs = new Observable(0);

const unsubscribe = obs.subscribe((newValue) => {
    print(`Value changed to: ${newValue}`);
});

setInterval(() => {
    obs.value = Math.floor(Math.random() * 100);
}, 1000);

setTimeout(() => {
    print('Stopping subscription...');
    unsubscribe();
}, 5000);

function* fibonacci() {
    let [prev, curr] = [0, 1];
    for (;;) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const fibGen = fibonacci();
print('Fibonacci Sequence:');
for (let i = 0; i < 10; i++) {
    print(fibGen.next().value);
}

(async () => {
    const resolveAfter2Seconds = () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('resolved');
            }, 2000);
        });
    };

    print('Calling async function...');
    const result = await resolveAfter2Seconds();
    print(result);
})();

const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
map.set('key3', 'value3');
for (let [key, value] of map) {
    print(`${key} = ${value}`);
}

const doubleNumbers = [1, 2, 3].map(n => n * 2);
print('Doubled numbers:', doubleNumbers);

const filterEvens = [1, 2, 3, 4, 5].filter(n => n % 2 === 0);
print('Even numbers:', filterEvens);

const sumReducer = (acc, curr) => acc + curr;
const sum = [1, 2, 3, 4, 5