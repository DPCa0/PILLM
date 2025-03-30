 
const greetUser = (name = 'World') => `Hello, ${name}!`;

 
const greetPeople = (namesArray) => namesArray.map(greetUser);

 
const loggerHandler = {
    get(target, property) {
        print(`Accessing property "${property}" with value: ${target[property]}`);
        return target[property];
    },
    set(target, property, value) {
        print(`Setting property "${property}" with value: ${value}`);
        target[property] = value;
        return true;
    }
};

 
let people = new Proxy(['Alice', 'Bob', 'Charlie'], loggerHandler);

 
let [firstPerson, secondPerson, thirdPerson, fourthPerson = 'Default Person'] = people;

 
print(`Greeting the first three people: ${greetUser(firstPerson)}, ${greetUser(secondPerson)}, and ${greetUser(thirdPerson)}.`);
print(`Greeting a fourth person who doesn't exist in the array: ${greetUser(fourthPerson)}`);

// Using async/await with Promises
const fetchGreeting = async (name) => {
    const greeting = await new Promise(resolve => setTimeout(() => resolve(greetUser(name)), 1000));
    return greeting;
};

// Immediately Invoked Function Expression (IIFE) to execute async code
(async () => {
    try {
        const greeting = await fetchGreeting('Dynamic Name');
        print(`Fetched greeting: ${greeting}`);
    } catch (error) {
        console.error('Error fetching greeting:', error);
    }
})();
