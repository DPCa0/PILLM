 

 
export function add(...numbers) {
    return numbers.reduce((sum, num) => sum + num, 0);
}

export function multiply(...numbers) {
    return numbers.reduce((product, num) => product * num, 1);
}

 
import { add, multiply } from './mathOperations.js';

class Calculator {
    static async performOperation(operation, ...args) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    let result;
                    switch (operation) {
                        case 'add':
                            result = add(...args);
                            break;
                        case 'multiply':
                            result = multiply(...args);
                            break;
                        default:
                            throw new Error('Unsupported operation');
                    }
                    resolve(result);
                } catch (error) {
                    reject(error.message);
                }
            }, 1000);
        });
    }
}

 
(async () => {
    const operations = [
        { op: 'add', args: [1, 2, 3, 4, 5] },
        { op: 'multiply', args: [1, 2, 3, 4, 5] },
    ];

    for (let { op, args } of operations) {
        try {
            const result = await Calculator.performOperation(op, ...args);
            print(`The result of ${op} operation on [${args}] is: ${result}`);
        } catch (error) {
            console.error(`Error performing ${op}: ${error}`);
        }
    }
})();
