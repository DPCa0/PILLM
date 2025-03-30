 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async function advancedFeatureDemo() {
     
    const operations = new Map();

     
    operations.set('add', (a, b) => a + b);
    operations.set('subtract', (a, b) => a - b);
    operations.set('multiply', (a, b) => a * b);
    operations.set('divide', (a, b) => a / b);

     
    const privateKey = Symbol('private');
    const object = {
        publicProperty: 'I am public',
        [privateKey]: 'I am private'
    };

     
    const handler = {
        get: (target, prop) => {
            if (prop === privateKey) return 'Access Denied';
            return target[prop];
        }
    };
    const proxyObject = new Proxy(object, handler);

     
    function calculate(operation, ...args) {
        const [first, second] = args;
        return operations.get(operation)(first, second);
    }

     
    const numbers = new Set([1, 2, 3, 4, 5]);
    function* numberGenerator(nums) {
        for (const num of nums) {
            yield num * num;
        }
    }

     
    print('Starting calculations...');
    await delay(1000);
    print(`Addition: 7 + 5 = ${calculate('add', 7, 5)}`);
    print(`Subtraction: 7 - 5 = ${calculate('subtract', 7, 5)}`);

    await delay(1000);
    print(`Public Property: ${proxyObject.publicProperty}`);
    print(`Private Property: ${proxyObject[privateKey]}`);

    await delay(1000);
    print('Squared Numbers:');
    for (const value of numberGenerator(numbers)) {
        print(value);
    }
})();
