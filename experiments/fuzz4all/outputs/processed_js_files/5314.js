 
async function fetchData(url) {
    try {
         
        let response = await fetch(url);
        
         
        if (!response.ok) throw new Error('Network response was not ok');

         
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

 
const handler = {
    get: (target, property) => {
        print(`Accessing property ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting property ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const user = new Proxy({ name: 'Alice', age: 25 }, handler);

 
print(user.name);
user.age = 26;

 
let uniqueNumbers = new Set([1, 2, 3, 4, 5, 5, 6]);
print(uniqueNumbers);

 
let numbers = [1, 2, 3, 4, 5];
let squares = numbers.map(num => num ** 2);
let [first, second, ...rest] = squares;
print(first, second, rest);

 
(async () => {
    let data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);
})();
