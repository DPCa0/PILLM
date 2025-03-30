 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
(async function complexJSFeatures() {
     
    const person = { name: 'Alice', age: 25, location: 'Wonderland' };
    const { name, ...rest } = person;
    print(`Extracted Name: ${name}`);
    print(`Rest:`, rest);
    
     
    function tag(strings, ...values) {
        return strings[0] + values.map((v, i) => `${v} ${strings[i + 1]}`).join('');
    }
    const taggedOutput = tag`Hello, ${name}. Welcome to the ${rest.location}!`;
    print(taggedOutput);

     
    const map = new Map([['key1', 'value1'], ['key2', 'value2']]);
    const set = new Set([1, 2, 3, 4, 5]);
    print('Map keys:', [...map.keys()]);
    print('Set has 3?', set.has(3));

     
    const handler = {
        get: (target, prop) => {
            print(`Getting property ${prop}`);
            return target[prop];
        },
        set: (target, prop, value) => {
            print(`Setting property ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    };
    const proxyPerson = new Proxy(person, handler);
    proxyPerson.name = 'Bob';
    print('Proxied Name:', proxyPerson.name);

     
    print('Starting delay...');
    await delay(1000);
    print('1 second delay completed.');
})();
