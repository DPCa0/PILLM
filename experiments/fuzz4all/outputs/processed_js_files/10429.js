 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* asyncGenerator() {
    const data = [Symbol('First'), Symbol('Second'), Symbol('Third')];
    for (const item of data) {
        await delay(500);  
        yield item;
    }
}

const handler = {
    get: function(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            throw new Error(`${prop} does not exist on target`);
        }
    }
};

const target = {
    greeting: 'Hello, world!',
    addNumbers(a, b) {
        return a + b;
    }
};

const proxy = new Proxy(target, handler);

(async function() {
    try {
        print(proxy.greeting);
        print(proxy.addNumbers(5, 10));

         
         

        for await (const sym of asyncGenerator()) {
            print(sym.toString());
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
})();
