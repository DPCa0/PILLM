(async () => {
     
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
     
    function* randomNumbersGenerator() {
        while (true) {
            yield Math.floor(Math.random() * 100);
        }
    }
    
     
    const handler = {
        get: (obj, prop) => {
            if (prop in obj) {
                return Reflect.get(obj, prop);
            }
            return `Property ${prop} doesn't exist`;
        }
    };
    
    const target = { name: 'Advanced JS' };
    const proxy = new Proxy(target, handler);
    
    // Using Set and Map
    const numberSet = new Set();
    const numberMap = new Map();
    
    const gen = randomNumbersGenerator();
    
    while (numberSet.size < 5) {
        const num = gen.next().value;
        numberSet.add(num);
        numberMap.set(num, num * num);
    }
    
    print(`Program Name: ${proxy.name}`);
    print(`Non-existent Property: ${proxy.nonExistent}`);
    
    print('Generated Numbers:', Array.from(numberSet));
    print('Number Squares:');
    numberMap.forEach((value, key) => print(`${key}: ${value}`));
    
    // Using Class with Static Method
    class Utility {
        static square(x) {
            return x * x;
        }
    }
    
    print('Squares using Utility Class:');
    numberSet.forEach(num => print(`${num}: ${Utility.square(num)}`));

    // Template Literals and Destructuring
    const [first, ...rest] = Array.from(numberSet);
    print(`First number: ${first}`);
    print(`Rest of the numbers: ${rest.join(', ')}`);
    
    // Simulating an asynchronous operation
    print('Starting async operation...');
    await delay(2000);
    print('Async operation complete.');
})();
