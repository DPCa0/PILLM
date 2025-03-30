 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGeneratorWithDelay() {
    yield await delay(1000).then(() => 'First value after 1 second');
    yield await delay(2000).then(() => 'Second value after 2 seconds');
    yield await delay(3000).then(() => 'Third value after 3 seconds');
}

const handler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessed property: ${prop}`);
            return target[prop];
        }
        return `Property ${prop} not found`;
    },
    set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const proxiedObject = new Proxy({
    name: 'JavaScript Developer',
    level: 'Advanced'
}, handler);

(async () => {
    const gen = asyncGeneratorWithDelay();
    for await (let value of gen) {
        print(value);
    }

    print(proxiedObject.name);
    proxiedObject.level = 'Expert';
    print(proxiedObject.nonExistentProp);
})();
