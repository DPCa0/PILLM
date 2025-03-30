 
const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            print(`Getting property ${prop}`);
            return Reflect.get(target, prop, receiver);
        } else {
            console.warn(`Property ${prop} does not exist.`);
            return undefined;
        }
    },
    set(target, prop, value) {
        print(`Setting property ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

 
const complexObject = {
    data: {
        x: 10,
        y: 20,
        calculate: function() {
            return this.x + this.y;
        }
    },
    log() {
        print(`x: ${this.data.x}, y: ${this.data.y}`);
    }
};

 
const proxy = new Proxy(complexObject, handler);

 
const { data: { x, ...rest } } = proxy;
const newData = { x: 100, ...rest };

 
proxy.data.x = newData.x;
proxy.data.y = 50;

 
proxy.log();
print(`Calculated Value: ${proxy.data.calculate()}`);

 
(async function() {
    const { sqrt } = await import('mathjs');
    print(`Square root of 16 is: ${sqrt(16)}`);
})();
