 
const fibonacci = {
    *[Symbol.iterator]() {
        let [prev, curr] = [0, 1];
        for (;;) {
            [prev, curr] = [curr, prev + curr];
            yield curr;
        }
    }
};

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            console.warn(`Property "${prop}" does not exist.`);
            return undefined;
        }
    },
    set: (target, prop, value) => {
        if (typeof value === 'number' && value > 0) {
            target[prop] = value;
            return true;
        } else {
            console.error(`Invalid value for "${prop}". Must be a positive number.`);
            return false;
        }
    }
};

const user = new Proxy({}, handler);

 
(async () => {
    try {
        const moduleName = 'lodash';
        const { shuffle } = await import(moduleName);
        
         
        user['maxFibs'] = 10;
        
        print("First shuffled Fibonacci numbers:");
        print(shuffle([...fibonacci].slice(0, user.maxFibs)));
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
