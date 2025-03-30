 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const loggerProxy = target => {
    return new Proxy(target, {
        get: (obj, prop) => {
            print(`Accessed property: ${String(prop)}`);
            return prop in obj ? obj[prop] : 'Property does not exist';
        }
    });
};

 
function* numberSequence(start = 0, end = Infinity, step = 1) {
    let current = start;
    while (current <= end) {
        yield current;
        current += step;
    }
}

 
async function processSequence() {
    const config = loggerProxy({
        start: 0,
        end: 10,
        step: 2,
        delayMs: 500
    });

    print('Config:', config);
    
    const gen = numberSequence(config.start, config.end, config.step);

    for (let num of gen) {
        await delay(config.delayMs);
        print(`Number: ${num}`);
    }

    print('Sequence processing complete.');
}

 
processSequence();
