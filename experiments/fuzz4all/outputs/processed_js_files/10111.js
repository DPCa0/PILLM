 

class CustomPromise {
    constructor(executor) {
        this.value = undefined;
        this.state = 'PENDING';
        this.callbacks = [];
        
        const resolve = (value) => {
            if (this.state === 'PENDING') {
                this.state = 'FULFILLED';
                this.value = value;
                this.callbacks.forEach(callback => callback(this.value));
            }
        };

        executor(resolve);
    }

    then(callback) {
        if (this.state === 'FULFILLED') {
            callback(this.value);
        } else {
            this.callbacks.push(callback);
        }
    }
}

function* numberGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

async function* asyncNumberGenerator() {
    yield await new CustomPromise(resolve => setTimeout(() => resolve(4), 1000));
    yield await new CustomPromise(resolve => setTimeout(() => resolve(5), 1000));
}

const handler = {
    get: function(target, prop) {
        if (prop in target) {
            return target[prop];
        }
        return `Property ${prop} not found!`;
    }
};

const proxy = new Proxy({ hello: 'world' }, handler);

(async () => {
    print('Synchronous generator output:');
    const gen = numberGenerator();
    for (const num of gen) {
        print(num);
    }

    print('Asynchronous generator output:');
    const asyncGen = asyncNumberGenerator();
    for await (const num of asyncGen) {
        print(num);
    }

    print('Proxy handling:');
    print(proxy.hello);  
    print(proxy.missing);  
})();
