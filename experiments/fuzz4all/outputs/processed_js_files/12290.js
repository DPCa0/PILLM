 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetching error: ', error);
    }
}

 
const handler = {
    get: (obj, prop) => prop in obj ? obj[prop] : 'Property does not exist',
    set: (obj, prop, value) => {
        if (typeof value === 'string') {
            obj[prop] = value;
            return true;
        }
        console.error('Property value must be a string');
        return false;
    }
};

let person = { name: 'Alice', age: 25 };
let proxyPerson = new Proxy(person, handler);

 
const numbers = [1, 2, 3, 4, 5];
let squaredSum = numbers
    .map(num => num ** 2)
    .reduce((sum, num) => sum + num, 0);

print(`Squared sum: ${squaredSum}`);   

 
(async function() {
    let data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);
})();

 
print(proxyPerson.name);   
print(proxyPerson.gender);   

proxyPerson.name = 'Bob';
print(proxyPerson.name);   

proxyPerson.age = 30;   
print(proxyPerson.age);   
