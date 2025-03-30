 
async function fetchData() {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
     
    return { userId: 1, name: 'John Doe', email: 'john.doe@example.com' };
}

 
function logger(fn) {
    return async function (...args) {
        print('Function is starting:', fn.name);
        const result = await fn(...args);
        print('Function completed:', fn.name);
        return result;
    };
}

 
function createCounter() {
    let count = 0;
    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

 
const userHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Getting property "${prop}": ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property "${prop}" not found.`);
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

 
(async function main() {
     
    const loggedFetchData = logger(fetchData);

     
    const data = await loggedFetchData();
    print('Fetched data:', data);

     
    const counter = createCounter();
    print('Initial Count:', counter.getCount());
    counter.increment();
    print('After Increment:', counter.getCount());
    counter.decrement();
    print('After Decrement:', counter.getCount());

     
    const user = new Proxy({}, userHandler);
    user.name = 'Alice';
    print(user.name);
    print(user.age);  
})();
