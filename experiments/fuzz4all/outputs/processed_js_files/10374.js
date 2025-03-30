class MySingleton {
    constructor(name) {
        if (MySingleton.instance) return MySingleton.instance;
        this.name = name;
        MySingleton.instance = this;
    }

    static getInstance(name) {
        return new MySingleton(name);
    }

    greet() {
        print(`Hello, ${this.name}`);
    }
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncTask(n) {
    for (let i = 0; i < n; i++) {
        print(`Iteration ${i + 1}`);
        await sleep(1000);  
    }
    print('Task Complete');
}

function* fibonacci(n) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < n; i++) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const observable = new Proxy({}, {
    set(target, key, value) {
        print(`Property ${key} set to ${value}`);
        target[key] = value;
        return true;
    },
    get(target, key) {
        print(`Property ${key} accessed`);
        return target[key];
    }
});

const person = MySingleton.getInstance('World');
person.greet();

(async () => {
    await asyncTask(3);
    print([...fibonacci(5)]);

    observable.name = 'John Doe';
    print(observable.name);
})();
