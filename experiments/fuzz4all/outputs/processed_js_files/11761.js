 
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
const handler = {
    set(target, key, value) {
        print(`Setting ${key} to ${value}`);
        target[key] = value;
        return true;
    }
};

const user = new Proxy({}, handler);

 
const secretKey = Symbol('secret');
user.name = 'Alice';
user[secretKey] = 'Shhh!';

 
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}

const generateId = idGenerator();

 
function introduce({ name = 'Anonymous', age = 18 }, ...others) {
    print(`Name: ${name}, Age: ${age}`);
    print('Others:', others);
}

 
(async () => {
    user.age = 30;
    print('User:', user);
    print('Secret Key:', user[secretKey]);

    const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    print('Fetched data:', data);

    print('Generated IDs:', generateId.next().value, generateId.next().value);

    introduce({ name: 'Bob', age: 25 }, 'Likes coding', 'Enjoys hiking');
})();
