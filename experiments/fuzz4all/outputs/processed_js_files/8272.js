 
(async () => {
    const { readFile } = await import('fs/promises');
    const { EventEmitter } = await import('events');

     
    const handler = {
        get: (target, prop) => prop in target ? target[prop] : `Property "${prop}" doesn't exist`
    };
    const dynamicObject = new Proxy({ prop1: 'value1' }, handler);

    // Utilizing async/await with Promises
    async function fetchData() {
        const data = await readFile('data.json', 'utf8');
        print('File Data:', JSON.parse(data));
    }

    // Defining a class with private fields and methods
    class MyEmitter extends EventEmitter {
        #privateField = 'This is a private field';

        constructor() {
            super();
            this.on('event', this.#privateMethod);
        }

        #privateMethod = () => {
            print(this.#privateField);
        };

        triggerEvent() {
            this.emit('event');
        }
    }

    // Using higher-order function with closure
    const add = (x) => (y) => x + y;
    const increment = add(1);

    // Template literals and tagged templates
    function tag(strings, ...values) {
        return strings.raw[0] + values.map((val, i) => val + strings.raw[i + 1]).join('');
    }
    const taggedTemplate = tag`1 + 2 = ${add(1)(2)}`;

    // Initialize class and use features
    const emitter = new MyEmitter();
    emitter.triggerEvent();
    print('Dynamic Object Property:', dynamicObject.prop2); // Property "prop2" doesn't exist
    print('Incremented Value:', increment(4));  
    print('Tagged Template:', taggedTemplate);  

     
    fetchData();

})();
