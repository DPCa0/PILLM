 
function* fibonacci(n, current = 0, next = 1) {
    if (n === 0) return;
    yield current;
    yield* fibonacci(n - 1, next, current + next);
}

 
const logHandler = {
    get(target, property) {
        if (property in target) {
            print(`Getting value at index ${property}`);
            return target[property];
        } else {
            print(`Property ${property} does not exist`);
        }
    },
    set(target, property, value) {
        print(`Setting value at index ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
let fibArray = new Proxy([], logHandler);
const fibSequence = fibonacci(10);
let index = 0;
for (let num of fibSequence) {
    fibArray[index++] = num;
}

 
async function delayLog(array) {
    for (let i = 0; i < array.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        print(`Delayed Log: ${array[i]}`);
    }
}

 
delayLog(fibArray);
