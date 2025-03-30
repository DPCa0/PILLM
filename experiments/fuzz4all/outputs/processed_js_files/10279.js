 
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
}

 
const validator = {
    set: function(obj, prop, value) {
        if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
            throw new Error('Age must be a positive number');
        }
        print(`Property ${prop} set to ${value}`);
        obj[prop] = value;
        return true;
    }
};

let person = new Proxy({ name: 'Alice', age: 30 }, validator);

 
function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

 
const UNIQUE_KEY = Symbol('uniqueKey');
let obj = { [UNIQUE_KEY]: 'Hidden Value' };

 
(async () => {
    try {
        person.age = 25;  
        print(`Current age: ${person.age}`);
        
        let seq = infiniteSequence();
        print(seq.next().value);  
        print(seq.next().value);  
        
        let urls = [
            'https://jsonplaceholder.typicode.com/todos/1',
            'https://jsonplaceholder.typicode.com/todos/2'
        ];

        let results = await Promise.all(urls.map(url => fetchData(url)));
        print(results);

        print(`Symbol value: ${obj[UNIQUE_KEY]}`);  
    } catch (err) {
        console.error(err);
    }
})();
