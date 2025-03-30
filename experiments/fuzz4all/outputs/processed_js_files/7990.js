const asyncIterable = {
    [Symbol.asyncIterator]() {
        let count = 0;
        return {
            async next() {
                if (count < 3) {
                    await new Promise(resolve => setTimeout(resolve, 1000));  
                    return { value: count++, done: false };
                }
                return { done: true };
            }
        };
    }
};

const pipeline = (initVal, ...fns) => fns.reduce((acc, fn) => fn(acc), initVal);

(async function() {
    const results = [];
    
    for await (let num of asyncIterable) {
        results.push(num);
    }
    
    const enhancedResults = pipeline(
        results,
        arr => arr.map(x => x ** 2),
        arr => arr.filter(x => x > 1)
    );

    const record = new Proxy({}, {
        set(obj, prop, value) {
            print(`Setting ${prop} to ${value}`);
            obj[prop] = value;
            return true;
        },
        get(obj, prop) {
            print(`Getting ${prop}`);
            return prop in obj ? obj[prop] : undefined;
        }
    });

    record.results = enhancedResults;
    print(record.results);
})();
