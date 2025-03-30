 
import { writeFile } from 'fs/promises';

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            print(`Getting ${prop}`);
            return Reflect.get(target, prop);
        }
        return `Property ${prop} does not exist.`;
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const person = new Proxy({ name: "Alice", age: 25 }, handler);

 
async function savePersonData(filename, data) {
    try {
        await writeFile(filename, JSON.stringify(data, null, 2));
        print(`Data saved to ${filename}`);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}

 
const hobbies = new Set(['Reading', 'Traveling', 'Gardening']);
hobbies.add('Reading');  

const personMap = new Map();
personMap.set(person, hobbies);

 
function emphasize(strings, ...values) {
    return strings.reduce((result, string, i) => result + string + (values[i] ? `**${values[i]}**` : ''), '');
}

print(emphasize`Name: ${person.name}, Age: ${person.age}`);

 
class Calculator {
    static #lastResult = null;

    static add(a, b) {
        this.#lastResult = a + b;
        return this.#lastResult;
    }

    static getLastResult() {
        return this.#lastResult;
    }
}

 
print(`Last calculation result: ${Calculator.getLastResult()?.toString() ?? 'No calculations yet'}`);

(async () => {
     
    print(person.name);
    person.age = 26;

     
    await savePersonData('person.json', { ...person, hobbies: [...hobbies] });

     
    const sum = Calculator.add(10, 20);
    print(`Sum: ${sum}`);

    console.log(`Last calculation result: ${Calculator.getLast