 

 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Getting property '${property}'`);
            return target[property];
        } else {
            throw new Error(`Property '${property}' not found`);
        }
    },
    set(target, property, value) {
        print(`Setting property '${property}' to '${value}'`);
        target[property] = value;
        return true;
    }
};

let user = {
    name: 'Alice',
    age: 30
};

user = new Proxy(user, handler);

 
function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const numbers = [...generateSequence(1, 5)];
const [first, second, ...rest] = numbers;
print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

 
const doubled = numbers.map(num => num * 2);
const evenNumbers = doubled.filter(num => num % 2 === 0);

 
function highlight(strings, ...values) {
    return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');
}

const name = 'Alice';
print(highlight`Hello, ${name}! Welcome to the complex JavaScript program.`);

 
(async () => {
    try {
        user.name = 'Bob';  
        print(user.name);  

        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print(data);

    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
