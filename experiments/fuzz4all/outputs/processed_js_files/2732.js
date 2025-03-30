 

 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new CustomError(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const handler = {
    set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
            throw new CustomError("Age must be a number");
        }
        target[property] = value;
        return true;
    }
};

const person = new Proxy({}, handler);
person.name = "Alice";  
person.age = 30;        

 
const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
};

function applyOperation(a, b, operation) {
    return operation(a, b);
}

 
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return `${result}${string}<mark>${values[i] || ''}</mark>`;
    }, '');
}

const name = 'Alice';
const age = 30;

print(highlight`My name is ${name} and I am ${age} years old.`);

 
(async () => {
    const url = "https://jsonplaceholder.typicode.com/users/1";
    const userData = await fetchData(url);
    print("Fetched User Data:", userData);

     
    print("Addition Result:", applyOperation(10, 5, operations.add));
    print("Subtraction Result:", applyOperation(10, 5, operations.subtract));

     
    try {
        person.age = "thirty";  
    } catch (error) {
        console.error(error);
    }
})();
