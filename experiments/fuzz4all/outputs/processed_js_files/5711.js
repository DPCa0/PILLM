 
const createLoggingProxy = (target) => new Proxy(target, {
    get(target, prop, receiver) {
        print(`Getting property ${String(prop)}`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value, receiver) {
        print(`Setting property ${String(prop)} to ${value}`);
        return Reflect.set(...arguments);
    }
});

 
const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30
};

 
const proxiedPerson = createLoggingProxy(person);

 
const { firstName, ...rest } = proxiedPerson;

 
(async () => {
    const { format } = await import('date-fns');
    const now = new Date();
    print(`Formatted date: ${format(now, 'yyyy-MM-dd')}`);
})();

 
class Greeter {
    #name;

    constructor(name) {
        this.#name = name;
    }

    greet() {
        print(`Hello, ${this.#name}!`);
    }

    static createDefaultGreeter() {
        return new Greeter('World');
    }
}

 
const greeter = null;
const defaultGreeter = greeter?.greet() ?? Greeter.createDefaultGreeter();
defaultGreeter.greet();
