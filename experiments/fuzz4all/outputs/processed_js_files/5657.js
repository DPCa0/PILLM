class Observable {
    constructor(value) {
        this.value = value;
        this.listeners = new Set();
    }
    
    subscribe(listener) {
        this.listeners.add(listener);
    }
    
    notify(newValue) {
        this.value = newValue;
        this.listeners.forEach(listener => listener(newValue));
    }
}

function asyncCalculation(a, b) {
    return new Promise(resolve => {
        setTimeout(() => resolve(a ** b), 1000);
    });
}

async function main() {
    const obs1 = new Observable(5);
    const obs2 = new Observable(3);

    obs1.subscribe(value => print(`Observable 1 updated: ${value}`));
    obs2.subscribe(value => print(`Observable 2 updated: ${value}`));
    
    const result = await asyncCalculation(obs1.value, obs2.value);
    print(`Async Calculation Result: ${result}`);

     
    import('./someModule.js').then(module => {
        print(module.someFunction(result));
    }).catch(err => {
        console.error("Failed to load module", err);
    });

     
    const target = {
        name: 'World',
    };

    const handler = {
        get(target, property) {
            return property in target ? target[property] : `Hello, ${target.name}!`;
        }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.greeting);  
}

main();
