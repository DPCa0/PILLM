 
const validator = {
    set(target, key, value) {
        if (key === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        if (key === 'name' && typeof value === 'string') {
            target[key] = value.trim().toUpperCase();  
            return true;
        }
        target[key] = value;
        return true;
    }
};

let person = new Proxy({}, validator);

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        print(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const operations = new Map([
    ['add', (a, b) => a + b],
    ['subtract', (a, b) => a - b],
    ['multiply', (a, b) => a * b],
    ['divide', (a, b) => a / b]
]);

const uniqueNumbers = new Set([1, 2, 3, 4, 4, 5]);

 
function* numberGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

const numbers = numberGenerator(1, 5);
for (let n of numbers) {
    print(n);
}

 
let dynamicPerson = Reflect.construct(Object, []);
Reflect.set(dynamicPerson, 'firstName', 'Jane');
Reflect.set(dynamicPerson, 'lastName', 'Doe');

print(dynamicPerson.firstName);  
print(dynamicPerson.lastName);   

 
person.name = ' John Doe ';
person.age = 30;

print(person);  

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

 
const addOperation = operations.get('add');
print(addOperation(10, 5));  

 