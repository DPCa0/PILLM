 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
     
    const featureFlag = 'ENABLE_FEATURE';
    const config = {
        [featureFlag]: true,
        run: function() {
            print('Feature is running...');
        }
    };

     
    function createCounter() {
        let count = 0;
        return {
            increment: () => ++count,
            decrement: () => --count,
            value: () => count
        };
    }

     
    const handler = {
        get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} is not available`
    };

    const proxy = new Proxy(config, handler);

     
    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');

    const set = new Set([1, 2, 3, 4, 5]);

     
    const [...spreadSet] = set;
    const { ENABLE_FEATURE, run } = proxy;

    print(`Configuration Feature Flag: ${ENABLE_FEATURE}`);
    if (ENABLE_FEATURE) {
        run();
    }

    print('Map and Set:');
    print('Map:', map);
    print('Set:', spreadSet);

     
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(num => num * 2);
    const even = doubled.filter(num => num % 2 === 0);

    print('Doubled Numbers:', doubled);
    print('Even Numbers:', even);

     
    const counter = createCounter();
    print('Counter:', counter.increment());
    print('Counter:', counter.increment());
    print('Counter:', counter.decrement());

     
    print('Starting async task...');
    await delay(1000);
    print('Async task completed!');

})();
