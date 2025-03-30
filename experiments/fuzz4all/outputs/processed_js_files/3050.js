 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function* asyncNumberGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        await delay(100);
        yield i;
    }
}

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing ${prop}: ${target[prop]}`);
            return target[prop];
        }
        print(`Property ${prop} does not exist.`);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

 
(async () => {
    const numbers = new Proxy([], handler);

    for await (let number of asyncNumberGenerator(1, 5)) {
        numbers.push(number);
    }

    print("Final numbers collection:", numbers);
})();
