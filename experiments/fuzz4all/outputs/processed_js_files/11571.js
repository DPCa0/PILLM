 
async function* generateValues() {
    let value = 0;
    while (value < 3) {
        yield new Promise(resolve => setTimeout(() => resolve(value++), 1000));
    }
}

const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Accessing property "${prop}":`, target[prop]);
            return target[prop];
        } else {
            throw new Error(`Property "${prop}" does not exist.`);
        }
    }
};

const targetObj = {
    prop1: 'Hello',
    prop2: 'world',
    get greeting() {
        return `${this.prop1}, ${this.prop2}!`;
    }
};

const proxy = new Proxy(targetObj, handler);

(async () => {
    const generator = generateValues();
    for await (let value of generator) {
        print('Generated value:', value);
    }
    print(proxy.greeting);
})();
