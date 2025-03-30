 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
    try {
         
        let [first, , third] = [10, 20, 30];
        
         
        const numbers = [...Array(5).keys()].map(x => x * 10);
        
         
        print(`Extracted elements: first=${first}, third=${third}`);
        print(`Generated numbers: ${numbers.join(', ')}`);

         
        let myMap = new Map();
        myMap.set('x', first);
        myMap.set('y', third);
        
         
        for (let [key, value] of myMap) {
            print(`Key: ${key}, Value: ${value}`);
        }

         
        await delay(1000);
        print('Executed after 1 second');

         
        function* numberGenerator() {
            yield* numbers;
        }
        
         
        for (let num of numberGenerator()) {
            print(`Generator yielded: ${num}`);
        }
        
         
        const handler = {
            set: function(obj, prop, value) {
                if (prop === 'age' && typeof value !== 'number') {
                    throw new TypeError('Age must be a number');
                }
                obj[prop] = value;
                return true;
            }
        };
        
        const person = new Proxy({}, handler);
        person.name = 'Alice';
        person.age = 30;
        print(`Person: ${person.name}, Age: ${person.age}`);
        
         
         

    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
    }
})();
