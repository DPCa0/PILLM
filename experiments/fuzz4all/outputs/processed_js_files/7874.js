 
async function fetchData(url) {
    try {
         
        const response = await fetch(url);
        
         
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
         
        const data = await response.json();

         
        return data;
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
        return null;
    }
}

 
const person = {
    name: 'Alice',
    age: 30
};

const handler = {
    get(target, property) {
        print(`Getting ${property}`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

const proxyPerson = new Proxy(person, handler);

 
function* range(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

 
const numbers = range(1, 5);
for (const number of numbers) {
    print(`Generated number: ${number}`);
}

 
fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data => {
    if (data) {
        print('Fetched Data:', data);
    }
});

 
proxyPerson.name;     
proxyPerson.age = 31;  

 
const metaMap = new WeakMap();

const obj = {};
metaMap.set(obj, { creationDate: new Date() });

print('Object metadata:', metaMap.get(obj));
