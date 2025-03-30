class Singleton {
    constructor(name = 'Default') {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.name = name;
        Singleton.instance = this;
    }
}

const handler = {
    get(target, property) {
        if (property in target) {
            return target[property];
        } else {
            console.warn(`Property ${property} does not exist`);
            return null;
        }
    },
    set(target, property, value) {
        if (typeof value === 'string') {
            target[property] = value;
        } else {
            console.warn(`Property ${property} must be a string`);
        }
    }
};

const singletonInstance = new Proxy(new Singleton('FirstInstance'), handler);

async function* asyncGenerator() {
    yield 'Processing Step 1...';
    yield 'Processing Step 2...';
    return 'Done!';
}

(async () => {
    const steps = asyncGenerator();
    for await (const step of steps) {
        print(step);
    }
    print(singletonInstance.name);

    singletonInstance.newProp = 123;  
    singletonInstance.name = 'NewInstanceName';  
    print(singletonInstance.name);
    print(singletonInstance.nonExistentProp);  
})();
