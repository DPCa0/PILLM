 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
const target = {
    name: "Advanced JavaScript",
    difficulty: "Hard"
};

const handler = {
    get: (obj, prop) => {
        print(`Property ${prop} has been accessed`);
        return obj[prop];
    },
    set: (obj, prop, value) => {
        if (prop === 'difficulty' && value !== 'Hard') {
            throw new CustomError("Difficulty must be hard!");
        }
        print(`Setting value ${value} to property ${prop}`);
        obj[prop] = value;
        return true;
    }
};

const proxy = new Proxy(target, handler);

 
(async () => {
    try {
         
        const _ = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');
        const array = [1, 2, 3, 4, 5];
        const evens = _.filter(array, num => num % 2 === 0);
        
        print(`Filtered even numbers: ${evens}`);  

         
        print(proxy.name);
        proxy.difficulty = "Hard";
        print(proxy.difficulty);

         
        proxy.difficulty = "Easy";
    } catch (err) {
        if (err instanceof CustomError) {
            console.error(`Custom error occurred: ${err.message}`);
        } else {
            console.error(`An unexpected error occurred: ${err.message}`);
        }
    }
})();
