 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
}

 
const person = { name: 'Alice', age: 25 };
const handler = {
    get: (target, property) => {
        print(`Getting ${property}: ${target[property]}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};
const proxiedPerson = new Proxy(person, handler);

 
function* numberGenerator() {
    let number = 0;
    while (true) {
        yield number++;
    }
}

 
(async () => {
    const apiURL = 'https://jsonplaceholder.typicode.com/todos/1';
    
     
    const todo = await fetchData(apiURL);
    
     
    proxiedPerson.name = 'Bob';
    print(`Proxied name: ${proxiedPerson.name}`);
    
     
    const numbers = numberGenerator();
    print(`Next number: ${numbers.next().value}`);
    print(`Next number: ${numbers.next().value}`);
    
     
    print('Fetched Todo:', todo);
})();
