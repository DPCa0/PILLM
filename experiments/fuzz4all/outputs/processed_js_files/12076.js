 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    const data = { message: 'Hello, async world!' };
    print('Data fetched:', data);
    return data;
}

 
function* numberSequence() {
    for (let i = 1; i <= 5; i++) {
        yield i;
    }
}

 
const handler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        }
        return `Property '${prop}' does not exist!`;
    }
};

const person = new Proxy({ name: 'John Doe', age: 30 }, handler);

 
class Robot {
    #model;  

    constructor(model) {
        this.#model = model;
    }

    get model() {
        return this.#model;
    }

    static greet() {
        print('Beep bop, hello!');
    }
}

 
const uniqueNumbers = new Set([1, 2, 3, 4, 4, 5]);
const doubleNumbers = new Map([...uniqueNumbers].map(num => [num, num * 2]));

 
(async () => {
     
    const data = await fetchData();

     
    const numbers = numberSequence();
    for (let num of numbers) {
        print('Generated number:', num);
    }

     
    print(person.name);  
    print(person.gender);  

     
    const robot = new Robot('RX-78');
    print('Robot model:', robot.model);  
    Robot.greet();

     
    doubleNumbers.forEach((value, key) => {
        print(`Number: ${key}, Doubled: ${value}`);
    });
})();
