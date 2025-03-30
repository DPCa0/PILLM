 
const fibonacci = {
    *[Symbol.iterator]() {
        let a = 0, b = 1;
        while (true) {
            yield a;
            [a, b] = [b, a + b];
        }
    }
};

 
const [first, second, third, ...others] = [...fibonacci].slice(0, 10);

print(`First three Fibonacci numbers: ${first}, ${second}, ${third}`);
print(`Next seven Fibonacci numbers: ${others.join(', ')}`);

 
const handler = {
    get(target, prop, receiver) {
        print(`Accessing property "${prop}"`);
        return Reflect.get(target, prop, receiver);
    }
};

 
const user = new Proxy({
    name: 'Alice',
    age: 30,
    job: 'Developer'
}, handler);

 
print(user.name);
print(user.age);

 
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

 
(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

 
const userMap = new Map();
userMap.set(user, { lastLogin: new Date(), accessLevel: 'admin' });

print(`User access level: ${userMap.get(user).accessLevel}`);
print(`Last login: ${userMap.get(user).lastLogin}`);
