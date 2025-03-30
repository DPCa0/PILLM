 
const readline = require('readline');

 
async function* streamInput() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    for await (const line of rl) {
        yield line;
    }
}

 
(async function main() {
    print('Welcome to the complex JavaScript program!');

    const inputIterator = streamInput();

     
    const userData = new Proxy({}, {
        set(target, prop, value) {
            print(`Setting property ${prop} to ${value}`);
            target[prop] = value;
            return true;
        },
        get(target, prop) {
            print(`Getting property ${prop}`);
            return target[prop] || "Property not set";
        }
    });

    userData.name = "John Doe";
    print(userData.name);

    print("Please enter a series of numbers. Type 'done' to finish.");

    let numbers = [];
    
    for await (const input of inputIterator) {
        if (input.trim().toLowerCase() === 'done') break;
        const number = parseFloat(input);
        if (!isNaN(number)) numbers.push(number);
    }

     
    const [first, second, ...rest] = numbers;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const average = numbers.length ? sum / numbers.length : 0;
    print(`First Number: ${first}, Second Number: ${second}, Sum: ${sum}, Average: ${average}`);

     
    const uniqueNumbers = [...new Set(numbers)];
    print(`Unique numbers: ${uniqueNumbers.join(', ')}`);

     
    const closureExample = (() => {
        let counter = 0;
        return () => ++counter;
    })();

    print(`Counter: ${closureExample()}`);
    print(`Counter: ${closureExample()}`);

    print("Thanks for using this complex JavaScript program!");
})();
