 
const uniqueID = Symbol('id');

 
const person = new Proxy({
    [uniqueID]: 123,
    name: 'Alice',
    age: 30
}, {
    get(target, property) {
        if (property in target) {
            print(`Getting ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.warn(`Property ${property} not found`);
        }
    },
    set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
});

 
async function fetchData() {
     
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({ data: 'some data' }), 1000);
    });
}

async function processData() {
    try {
        const { data } = await fetchData();
        print(`Fetched data: ${data}`);
    } catch (error) {
        console.error('Failed to fetch data:', error);
    }
}

 
function greet(user) {
    return `Hello, ${user.name}! You are ${user.age} years old and your unique ID is ${user[uniqueID]}.`;
}

 
function updateUserInfo({ name, ...rest }) {
    return {
        name: name.toUpperCase(),
        ...rest
    };
}

 
person.name = 'Bob';  
print(person.name);  

const updatedPerson = updateUserInfo(person);
print(greet(updatedPerson));

processData();
