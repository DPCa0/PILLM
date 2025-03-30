 
async function* fetchUsernames(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        if (!response.ok) {
            yield `Error fetching from ${url}`;
            continue;
        }
        const data = await response.json();
        yield data.username;
    }
}

 
const loggerHandler = {
    get(target, prop) {
        print(`Property '${prop}' accessed`);
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(...arguments);
    }
};

 
const user = new Proxy({ firstName: 'John', lastName: 'Doe' }, loggerHandler);

 
(async () => {
    const urls = [
        'https://api.example.com/user/1',
        'https://api.example.com/user/2'
    ];

    const iterator = fetchUsernames(urls);
    const results = [];

    for await (const username of iterator) {
        results.push(username);
    }

    print('Fetched Usernames:', results);
})();

 
const greetUser = ({ firstName, lastName }) => {
    print(`Hello, ${firstName} ${lastName}! Welcome to our platform.`);
};

 
print(user.firstName);
user.lastName = 'Smith';

 
greetUser(user);
