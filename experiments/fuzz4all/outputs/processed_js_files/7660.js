 
import { createInterface } from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

 
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
     
    const rl = createInterface({ input, output });

     
    const userInput = await rl.question('Enter a comma-separated list of numbers: ');

     
    rl.close();

     
    const numbers = userInput.split(',').map(num => parseFloat(num.trim()));

     
    const squaredNumbers = numbers
        .filter(num => !isNaN(num))
        .map(num => num ** 2);

     
    const uniqueSquaredNumbers = new Set(squaredNumbers);

     
    const result = [...uniqueSquaredNumbers];

     
    print(`Unique squared numbers: ${result.join(', ')}`);

     
    await wait(1000);

     
    function* counter() {
        let count = 0;
        while (true) {
            yield count++;
        }
    }

     
    const counterInstance = counter();
    const handler = {
        get(target, prop) {
            if (prop === 'next') print('Accessed next value of counter');
            return Reflect.get(target, prop);
        }
    };

    const proxiedCounter = new Proxy(counterInstance, handler);

     
    print(`Counter values: ${proxiedCounter.next().value}, ${proxiedCounter.next().value}, ${proxiedCounter.next().value}`);
})();
