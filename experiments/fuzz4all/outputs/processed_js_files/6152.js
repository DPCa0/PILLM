 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* delayedNumbers() {
    for (let i = 1; i <= 5; i++) {
        await delay(500);
        yield i;
    }
}

 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return target[prop];
        }
        return `Property ${prop} does not exist`;
    },
    apply(target, thisArg, args) {
        return Reflect.apply(target, thisArg, args) * 2;
    }
};

 
const multiplyByTwo = number => number * 2;

 
const proxy = new Proxy(multiplyByTwo, handler);

 
(async () => {
    for await (let num of delayedNumbers()) {
        print(`Original: ${num}, Proxy applied: ${proxy(num)}`);
        print(proxy.nonExistentProperty);
    }
})();
