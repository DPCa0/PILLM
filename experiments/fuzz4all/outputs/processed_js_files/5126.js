 
const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
};

function* createIdGenerator() {
    let id = 0;
    while (true) {
        yield id++;
    }
}

const idGenerator = createIdGenerator();

const handler = {
    get(target, prop, receiver) {
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        }
        throw new Error(`Property ${prop} does not exist`);
    },
    set(target, prop, value, receiver) {
        if (typeof value === 'string' && value.trim() !== '') {
            return Reflect.set(target, prop, value, receiver);
        }
        throw new Error(`Invalid value for property ${prop}`);
    }
};

const createUser = (name, age) => {
    const user = {
        id: idGenerator.next().value,
        name,
        age
    };
    return new Proxy(user, handler);
};

(async () => {
    try {
        const data = await fetchData('https://jsonplaceholder.typicode.com/users');
        const users = data.map(user => createUser(user.name, user.id));

        users.forEach(user => {
            print(`User ID: ${user.id}, Name: ${user.name}`);
        });

        try {
            print(users[0].nonExistentProperty);  
        } catch (error) {
            console.error(error.message);
        }

        try {
            users[0].name = '';  
        } catch (error) {
            console.error(error.message);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
