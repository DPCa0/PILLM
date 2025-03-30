 
import { promises as fs } from 'fs';

 
(async function complexJSProgram() {
    try {
         
        const [first, ...rest] = [1, 2, 3, 4, 5];
        print(`Destructured first element: ${first}`);
        print(`Rest of the elements: ${rest}`);

         
        const map = new Map([[1, 'one'], [2, 'two']]);
        const extendedMap = new Map([...map, [3, 'three']]);
        print('Extended Map:', extendedMap);

         
        await fs.writeFile('example.txt', JSON.stringify([...extendedMap]), 'utf-8');
        print('File written successfully');

         
        const handler = {
            get(target, prop) {
                print(`Property '${prop}' has been accessed`);
                return Reflect.get(target, prop);
            }
        };
        const proxy = new Proxy({ a: 10, b: 20 }, handler);
        print('Proxy property a:', proxy.a);
        print('Proxy property b:', proxy.b);

         
        function* numberGenerator() {
            yield 1;
            yield 2;
            yield 3;
        }
        const gen = numberGenerator();
        print('Generated values:', gen.next().value, gen.next().value, gen.next().value);
        
         
        class SecretBox {
            #secret;
            constructor(secret) {
                this.#secret = secret;
            }
            #reveal() {
                return this.#secret;
            }
            getSecret() {
                return this.#reveal();
            }
        }
        const myBox = new SecretBox('Hidden Treasure');
        print('Secret:', myBox.getSecret());

    } catch (err) {
        console.error('An error occurred:', err);
    }
})();
