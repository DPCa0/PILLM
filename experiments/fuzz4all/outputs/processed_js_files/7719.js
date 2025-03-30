class Deferred {
    constructor() {
        this.promise = new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }
}

 
const accessLogger = (obj) => {
    return new Proxy(obj, {
        get(target, prop) {
            print(`Accessing property: ${prop}`);
            return target[prop];
        }
    });
};

 
async function* fetchData(urls) {
    for (const url of urls) {
        yield fetch(url).then(res => res.json());
    }
}

 
const createPerson = (name, age) => {
    const _private = new WeakMap();
    const _name = Symbol('name');
    const _age = Symbol('age');

    const person = {
        getName() {
            return _private.get(this)[_name];
        },
        getAge() {
            return _private.get(this)[_age];
        },
        greet() {
            print(`Hello, my name is ${this.getName()} and I am ${this.getAge()} years old.`);
        }
    };

    _private.set(person, { [_name]: name, [_age]: age });

    return person;
};

 
async function handlePromises(promises) {
    const results = await Promise.allSettled(promises);
    results.forEach((result) => print(result));
}

 
(async function main() {
    const urls = ['https://jsonplaceholder.typicode.com/todos/1', 'https://jsonplaceholder.typicode.com/todos/2'];
    const dataIterator = fetchData(urls);

    for await (const data of dataIterator) {
        print(data);
    }

    const promises = [Promise.resolve(42), Promise.reject('Oops'), Promise.resolve('All good')];
    handlePromises(promises);

    const deferred = new Deferred();
    deferred.promise.then(val => print(`Deferred resolved with: ${val}`));
    setTimeout(() => deferred.resolve('Success!'), 1000);

    const person = accessLogger(createPerson('John Doe', 30));
    person.greet();
})();
