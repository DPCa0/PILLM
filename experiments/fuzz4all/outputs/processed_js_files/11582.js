 
function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    while (limit--) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        }
        return `Property ${prop} does not exist.`;
    },
    set: (target, prop, value) => {
        if (typeof value === 'number' && value > 0) {
            target[prop] = value;
        } else {
            throw new Error('Value must be a positive number.');
        }
    }
};

const data = new Proxy({}, handler);

 
(async () => {
    const { add, multiply } = await import('./mathUtils.js');

     
    (async function() {
        for await (const num of fibonacci(10)) {
            print(`Fibonacci: ${num}`);
        }
    })();

     
    try {
        data.age = 25;
        print(data.age);  
        data.age = -1;  
    } catch (error) {
        console.error(error.message);
    }

     
    let person = null;
    print(person?.name ?? 'Guest');  

     
    const [first, ...rest] = [10, 20, 30, 40];
    print(`First: ${first}, Rest: ${rest.join(', ')}`);

     
    print(`Add: ${add(5, 10)}`);
    print(`Multiply: ${multiply(5, 10)}`);
})();

Note: This program assumes that you have a `mathUtils.js` module with `add` and `multiply` functions.