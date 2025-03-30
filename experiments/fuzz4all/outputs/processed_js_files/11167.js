 
async function* fetchData() {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3'
    ];

    for (const url of urls) {
        yield fetch(url).then(response => response.json());
    }
}

async function processData() {
    for await (const data of fetchData()) {
        print('Title:', data.title);
    }
}

 
(async () => {
    if (Math.random() > 0.5) {
        const { default: moment } = await import('moment');
        print('Current Time:', moment().format('MMMM Do YYYY, h:mm:ss a'));
    } else {
        print('Random choice to skip moment.js');
    }
})();

 
const handler = {
    set(target, property, value) {
        if (property === 'age') {
            if (!Number.isInteger(value) || value < 0) {
                throw new TypeError('Age must be a non-negative integer');
            }
        }
        target[property] = value;
        return true;
    }
};

const person = new Proxy({}, handler);
person.name = 'Alice';
try {
    person.age = 30;
    print(`Person: ${person.name}, Age: ${person.age}`);
    person.age = -5;  
} catch (error) {
    console.error(error.message);
}

 
(async () => {
    print('Processing data...');
    await processData();
})();
