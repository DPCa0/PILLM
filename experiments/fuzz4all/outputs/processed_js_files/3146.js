 

 
function fetchData(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url) {
                resolve(`Data from ${url}`);
            } else {
                reject("Invalid URL");
            }
        }, 1000);
    });
}

 
async function getData(url) {
    try {
        const data = await fetchData(url);
        print(data);
    } catch (error) {
        console.error(error);
    }
}

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield ++id;
    }
}

 
const handler = {
    set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
            throw new TypeError('Age must be a number');
        }
        target[property] = value;
        return true;
    }
};

const person = new Proxy({}, handler);

 
Reflect.set(person, 'name', 'John Doe');

try {
    Reflect.set(person, 'age', 'twenty-five');  
} catch (error) {
    console.error(error.message);
}

 
const generator = idGenerator();
print(`Generated ID: ${generator.next().value}`);
print(`Generated ID: ${generator.next().value}`);

 
getData('https://example.com/api/data');
