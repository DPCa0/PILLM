 
const handler = {
    get: (target, property) => {
        if (property in target) {
            print(`Getting ${property}`);
            return target[property];
        } else {
            console.error(`Property ${property} does not exist.`);
        }
    },
    set: (target, property, value) => {
        if (typeof value === 'number') {
            print(`Setting ${property} to ${value}`);
            target[property] = value;
            return true;
        } else {
            console.error(`${property} must be a number`);
            return false;
        }
    }
};

const numbers = new Proxy({ a: 1, b: 2 }, handler);

 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

const fib = fibonacci(10);

 
async function performAsyncTasks() {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

    const tasks = Array.from({ length: 3 }, (_, i) => delay(i * 1000).then(() => `Task ${i + 1} complete`));

    try {
        const results = await Promise.all(tasks);
        results.forEach(result => print(result));
    } catch (error) {
        console.error(error);
    }
}

 
(async () => {
     
    numbers.a = 10;
    print(numbers.a);
    numbers.c = 'not a number';

     
    print([...fib]);

     
    await performAsyncTasks();
})();
