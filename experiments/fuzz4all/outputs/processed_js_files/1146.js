 
import fetch from 'node-fetch';

(async function main() {
    try {
         
        const [first, second, ...rest] = [1, 2, 3, 4, 5];
        print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

         
        const module = await import('./someModule.js');
        module.doSomething();

         
        const map = new Map();
        const set = new Set([10, 20, 30, 40, 50]);

        map.set('numbers', set);

        map.get('numbers').forEach(value => {
            print(`Set Value: ${value}`);
        });

         
        const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
        const fetchPromises = urls.map(url => fetch(url).then(response => response.json()));

        const responses = await Promise.all(fetchPromises);

        responses.forEach(data => {
            print(`Fetched Data: ${data.title}`);
        });

         
        const validator = {
            set: function(obj, prop, value) {
                if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
                    throw new TypeError('Age must be a positive number');
                }
                obj[prop] = value;
                return true;
            }
        };

        const person = new Proxy({}, validator);
        person.age = 25;  
        print(`Person's Age: ${person.age}`);
        
         
         

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
