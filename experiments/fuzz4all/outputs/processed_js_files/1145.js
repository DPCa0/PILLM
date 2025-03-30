 

 
export const greet = name => `Hello, ${name}!`;
export const square = x => x * x;

 
import { greet, square } from './module1.js';

class Calculator {
    static async calculate(x, y, operation) {
        const result = await new Promise((resolve, reject) => {
            setTimeout(() => {
                if (operation === 'add') resolve(x + y);
                else if (operation === 'subtract') resolve(x - y);
                else if (operation === 'multiply') resolve(x * y);
                else if (operation === 'divide') y !== 0 ? resolve(x / y) : reject('Cannot divide by zero');
                else reject('Invalid operation');
            }, 1000);
        });
        return result;
    }
}

(async () => {
    const numbers = [1, 2, 3, 4];
    const [a, b, ...rest] = numbers;

    const message = greet('Advanced JavaScript');
    print(message);

    const squaredRest = rest.map(square);
    print('Squared Rest:', squaredRest);

    try {
        const sum = await Calculator.calculate(a, b, 'add');
        print('Sum:', sum);

        const difference = await Calculator.calculate(a, b, 'subtract');
        print('Difference:', difference);

        const product = await Calculator.calculate(a, b, 'multiply');
        print('Product:', product);

        const quotient = await Calculator.calculate(a, b, 'divide');
        print('Quotient:', quotient);
    } catch (error) {
        console.error(error);
    }
})();

Note: This program contains separate modules (module1.js and module2.js). Ensure you have a module-supporting environment (like a modern browser or Node.js) to execute this code.