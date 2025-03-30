 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

 
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            print('Fetching from cache for args:', args);
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

 
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

 
const memoizedFibonacci = memoize(fibonacci);

 
const prefix = 'user';
const userId = 42;
const user = {
    [prefix + 'Id']: userId,
    name: 'John Doe',
    sayHello() {
        print(`Hello, my name is ${this.name}`);
    }
};

 
const privateId = Symbol('privateId');
user[privateId] = 12345;

 
const userProxy = new Proxy(user, {
    get(target, prop) {
        if (prop === privateId) {
            return 'Access Denied';
        }
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        if (prop === 'name') {
            print(`Changing name to: ${value}`);
        }
        target[prop] = value;
        return true;
    }
});

 
(async () => {
    print('Generating user IDs...');
    const ids = idGenerator();
    print(ids.next().value);
    print(ids.next().value);
    print(ids.next().value);

    print('Calculating Fibonacci with memoization...');
    print(memoizedFibonacci(5));
    console.log(memoized