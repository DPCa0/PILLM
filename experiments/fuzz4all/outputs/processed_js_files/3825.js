 

 
const person = {
    name: 'Alice',
    age: 30
};

const handler = {
    get: (target, prop) => {
        if (prop === 'age') {
            return `${target[prop]} years old`;
        }
        return Reflect.get(target, prop);
    },
    set: (target, prop, value) => {
        if (prop === 'name' && typeof value !== 'string') {
            throw new TypeError('Name must be a string');
        }
        target[prop] = value;
        return true;
    }
};

const proxyPerson = new Proxy(person, handler);

 
function* fibonacci() {
    let [prev, curr] = [0, 1];
    while (true) {
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

const fib = fibonacci();

 
async function asyncOperation() {
    return new Promise((resolve) => {
        setTimeout(() => resolve('Operation Complete'), 1000);
    });
}

(async function() {
    print(proxyPerson.name);   
    print(proxyPerson.age);    

    proxyPerson.name = 'Bob';
    print(proxyPerson.name);   

    try {
        proxyPerson.name = 123;   
    } catch (e) {
        console.error(e.message);   
    }

    print(fib.next().value);   
    print(fib.next().value);   
    print(fib.next().value);   

    const result = await asyncOperation();
    print(result);   
})();
