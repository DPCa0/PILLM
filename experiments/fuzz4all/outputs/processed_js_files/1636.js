 
import { promises as fs } from 'fs';

 
(async () => {
    try {
         
        const message = format`Hello, ${process.env.USER || 'world'}!`;
        
         
        await fs.writeFile('message.txt', message);

         
        const data = await fs.readFile('message.txt', 'utf-8');
        print(data);

         
        const set = new Set([...'hello']);
        print([...set].join(''));

         
        const { pow, random } = Math;
        print(pow(random(), 3));

         
        const handler = {
            get: function(target, prop, receiver) {
                print(`Getting ${prop}`);
                return Reflect.get(...arguments);
            }
        };

        const obj = new Proxy({ foo: 'bar' }, handler);
        print(obj.foo);

    } catch (error) {
        console.error('Error:', error);
    }
})();

 
function format(strings, ...values) {
    return strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '');
}
