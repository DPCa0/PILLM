 
function* numberGenerator() {
    let num = 0;
    while (true) {
        yield num++;
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const proxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            print(`Accessing property "${prop}": ${target[prop]}`);
            return target[prop];
        } else {
            print(`Property "${prop}" not found, returning default value.`);
            return 'Default Value';
        }
    },
    set: (target, prop, value) => {
        print(`Setting property "${prop}" to "${value}"`);
        target[prop] = value;
        return true;
    }
};

const proxiedConfig = new Proxy({ threshold: 5, verbose: true }, proxyHandler);

async function main() {
    const generator = numberGenerator();
    
    for (let i = 0; i < 3; i++) {
        print(`Generator Value: ${generator.next().value}`);
        if (proxiedConfig.verbose) {
            print('Waiting for 1 second...');
        }
        await delay(1000);
    }
    
    proxiedConfig.threshold = 10;
    print(`Config threshold is now: ${proxiedConfig.threshold}`);
    print(`Non-existent property: ${proxiedConfig.someUndefinedProperty}`);
}

main();
