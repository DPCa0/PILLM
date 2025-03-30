 

function* generatorFunction() {
    yield 'Hello';
    yield ', ';
    yield 'world';
    yield '!';
}

const gen = generatorFunction();

const delay = ms => new Promise(res => setTimeout(res, ms));

const asyncIterator = {
    [Symbol.asyncIterator]() {
        return {
            next: async () => {
                const { value, done } = gen.next();
                await delay(500);  
                return done ? { done: true } : { value: value, done: false };
            }
        };
    }
};

const proxyHandler = {
    get: (target, property) => {
        if (property === 'msg') {
            return 'Async Generators & Proxies!';
        }
        return target[property];
    }
};

async function printMessage() {
    const proxy = new Proxy(asyncIterator, proxyHandler);

    print('Starting to construct message...');
    for await (const part of proxy) {
        process.stdout.write(part);
    }
    print(` ${proxy.msg}`);
}

printMessage();
