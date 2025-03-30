 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting value of ${property}`);
            return target[property];
        } else {
            throw new ReferenceError(`Property "${property}" does not exist.`);
        }
    },
    set(target, property, value) {
        if (typeof value === 'number' && !isNaN(value)) {
            print(`Setting value of ${property} to ${value}`);
            target[property] = value;
            return true;
        } else {
            throw new TypeError(`Value of ${property} must be a number.`);
        }
    }
};

const numbers = new Proxy({}, handler);

 
async function* fetchData() {
    const data = [1, 2, 3, 4, 5];
    for (const item of data) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield item;
    }
}

 
(async function() {
    try {
        let i = 0;
        for await (let num of fetchData()) {
            numbers[`num${i}`] = num;
            print(`num${i}:`, numbers[`num${i}`]);
            i++;
        }
    } catch (error) {
        console.error(error);
    }
})();

 
const complexArray = [1, 2, 3, 4, 5].flatMap(x => [x, x * 2]).filter(x => x > 3);
print('Complex Array:', complexArray);
