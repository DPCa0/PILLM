 

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

 
const handler = {
    set(target, property, value) {
        print(`Property ${property} set to ${value}`);
        return Reflect.set(target, property, value);
    }
};

let person = new Proxy({ name: 'Alice', age: 25 }, handler);
person.age = 26;  

 
function* idGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const ids = idGenerator();
print(ids.next().value);  
print(ids.next().value);  

 
const user = { id: 1, username: 'js_dev', email: 'jsdev@example.com' };
const { id, ...rest } = user;  
print(rest);  

const settings = { theme: 'dark', notifications: true };
const userSettings = { ...settings, loggedIn: true };  
print(userSettings);  

 
const uniqueNumbers = new Set([1, 2, 3, 3, 4]);
print(uniqueNumbers.size);  

const userMap = new Map();
userMap.set('Alice', { age: 30, email: 'alice@example.com' });
print(userMap.get('Alice').email);  

 
fetchData('https://jsonplaceholder.typicode.com/todos/1').then(data => print(data));
