(async () => {
     
    const myMap = new Map([
        ['number', 42],
        ['string', 'JavaScript'],
        ['boolean', true]
    ]);

     
    const validator = {
        set: function(obj, prop, value) {
            if (prop === 'age' && typeof value !== 'number') {
                throw new TypeError('Age must be a number');
            }
            obj[prop] = value;
            return true;
        }
    };

    const person = new Proxy({}, validator);
    person.name = 'Alice';
    person.age = 30;

     
    const uniqueValues = new Set(['apple', 'orange', 'banana', 'apple']);

     
    function* idGenerator() {
        let id = 0;
        while (true) {
            yield id++;
        }
    }

    const gen = idGenerator();

     
    const fetchData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('Data fetched');
            }, 1000);
        });
    };

    const data = await fetchData();

     
    function tag(strings, ...expressions) {
        return strings.reduce((acc, str, i) => `${acc}${str}<${expressions[i] || ''}>`, '');
    }
    
    const result = tag`Hello, ${person.name}! You are ${person.age} years old.`;

     
    const { name, age, ...rest } = person;

     
    print(`Map Value: ${myMap.get('string')}`);
    print(`Unique Values: ${[...uniqueValues].join(', ')}`);
    print(`Generated ID: ${gen.next().value}`);
    print(`Fetched Data: ${data}`);
    print(`Tagged Template: ${result}`);
    print(`Destructured Name: ${name}, Age: ${age}, Rest: ${JSON.stringify(rest)}`);
})();
