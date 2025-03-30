 
const asyncIterable = {
    data: ['apple', 'banana', 'cherry'],
    async *[Symbol.asyncIterator]() {
        for (let item of this.data) {
             
            await new Promise(resolve => setTimeout(resolve, 1000));
            yield item.toUpperCase();
        }
    }
};

 
(async () => {
    try {
         
        const result = await Promise.all(
            ['x', 'y', 'z'].map(async (letter) => {
                print(`Processing ${letter}`);
                return letter.repeat(3);
            })
        );

        print('Letters processed:', result);

        print('Async iterable items:');
        for await (let fruit of asyncIterable) {
            print(fruit);
        }
    } catch (error) {
        console.error('Error:', error);
    }
})();

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting property '${prop}'`);
        return Reflect.get(...arguments);
    },
    set: function(target, prop, value, receiver) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(...arguments);
    }
};

const obj = new Proxy({ name: 'John', age: 30 }, handler);

 
print(obj.name);   
obj.age = 31;
