 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const privateStore = (() => {
    const store = new WeakMap();
    return {
        get(obj, key) {
            const data = store.get(obj);
            return data ? data[key] : undefined;
        },
        set(obj, key, value) {
            let data = store.get(obj);
            if (!data) {
                data = {};
                store.set(obj, data);
            }
            data[key] = value;
        }
    };
})();

 
const loggerProxy = target => new Proxy(target, {
    apply: (target, thisArg, argumentsList) => {
        print(`Calling function ${target.name} with arguments: ${JSON.stringify(argumentsList)}`);
        return Reflect.apply(target, thisArg, argumentsList);
    }
});

 
class Person {
    constructor(name, age) {
        this.name = name;
        privateStore.set(this, 'age', age);
    }
    getAge() {
        return privateStore.get(this, 'age');
    }
}

const securePerson = new Proxy(Person, {
    construct(target, args) {
        const instance = new target(...args);
        return new Proxy(instance, {
            get(obj, prop) {
                if (prop === 'age') throw new Error('Access to age is restricted');
                return Reflect.get(obj, prop);
            }
        });
    }
});

 
(async () => {
    const greet = loggerProxy(async name => {
        await delay(1000);
        return `Hello, ${name}!`;
    });

    try {
        const alice = new securePerson('Alice', 30);
        print(`Name: ${alice.name}`);
        print(`Age: ${alice.getAge()}`);  
         

        const greeting = await greet(alice.name);
        print(greeting);
    } catch (error) {
        console.error(error.message);
    }
})();
