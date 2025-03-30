(async () => {
     
    const privateKey = Symbol('private');

     
    const handler = {
        get: (target, prop) => {
            if (prop === 'getSecret') {
                return () => `The secret is: ${target[privateKey]}`;
            }
            return target[prop];
        }
    };

    const secretHolder = new Proxy({ [privateKey]: 'JavaScript' }, handler);

     
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const revealSecret = async () => {
        print('Thinking...');
        await delay(1000);  
        print(secretHolder.getSecret());
    };

     
    const joinStrings = (...strings) => strings.join(' ');
    print(joinStrings('Hello', 'advanced', 'JavaScript', 'features!'));

     
    const uniqueValues = new Set([1, 2, 3, 3, 4, 5]);
    print('Unique values from Set:', [...uniqueValues]);

    const map = new Map();
    map.set('key1', 'value1');
    map.set('key2', 'value2');
    print('Values from Map:');
    map.forEach((value, key) => print(`${key}: ${value}`));

     
    const obj = { name: 'JavaScript', type: 'Language' };
    const { name, type } = obj;
    print(`Destructured object: ${name} is a ${type}`);

    await revealSecret();
})();
