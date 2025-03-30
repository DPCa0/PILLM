 
(async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

     
    const createObservableObject = target => {
        return new Proxy(target, {
            set(obj, prop, value) {
                print(`Property ${prop} is being set to ${value}`);
                obj[prop] = value;
                return true;
            }
        });
    };

    let data = createObservableObject({ count: 0 });

     
    const multiply = a => b => a * b;
    const double = multiply(2);

     
    function* counter() {
        let i = 0;
        while (true) yield i++;
    }

    const gen = counter();

     
    const simulateAsyncProcess = async (id, duration) => {
        await delay(duration);
        print(`Async process ${id} completed after ${duration}ms`);
        return id;
    };

    print('Processing...');
    const results = await Promise.all([
        simulateAsyncProcess(1, 1000),
        simulateAsyncProcess(2, 500),
        simulateAsyncProcess(3, 1500)
    ]);
    
    print('All processes completed:', results);

     
    const { sqrt } = await import('mathjs');
    print('Square root of 16 is:', sqrt(16));

     
    const wm = new WeakMap();
    let obj = {};
    wm.set(obj, "Metadata");
    print('WeakMap size:', wm.has(obj) ? 1 : 0);

    obj = null;  

     
    const uniqueNumbers = new Set([1, 2, 3, 4, 4, 5]);
    const numberDescriptions = new Map();
    uniqueNumbers.forEach(num => {
        numberDescriptions.set(num, `Number is ${num}`);
    });

    print([...numberDescriptions.entries()]);

     
    Reflect.set(data, 'count', gen.next().value);
    print('Data count:', data.count);

    Reflect.set(data, 'count', double(data.count));
    print('Doubled data count:', data.count);

})();
