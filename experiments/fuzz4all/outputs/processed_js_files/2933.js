 

 
const handler = {
    get: function(target, property, receiver) {
        print(`Getting ${property}`);
        return Reflect.get(...arguments);
    },
    set: function(target, property, value, receiver) {
        print(`Setting ${property} to ${value}`);
        return Reflect.set(...arguments);
    }
};

const targetObject = { name: 'Alice', age: 25 };
const proxy = new Proxy(targetObject, handler);

 
function* fibonacci() {
    let a = 0, b = 1;
    while (true) {
        [a, b] = [b, a + b];
        yield a;
    }
}

const fib = fibonacci();
print([...Array(5)].map(() => fib.next().value));

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        let data = await response.json();
        print('Data fetched:', data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

 
proxy.name = 'Bob';
print(proxy.name);

 
fetchData('https://api.github.com');

 
function tag(strings, ...values) {
    return strings.reduce((result, string, i) => result + string + (values[i] || ''), '');
}

const user = { username: 'jdoe', email: 'jdoe@example.com' };
print(tag`User Info - Name: ${user.username}, Email: ${user.email}`);
