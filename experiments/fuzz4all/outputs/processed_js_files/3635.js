 
const data = [
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 34 },
    { id: 3, name: 'Charlie', age: 22 },
    { id: 4, name: 'David', age: 34 },
];

 
const handler = {
    get(target, prop) {
        if (prop in target) {
            return target[prop];
        } else {
            print(`Property ${prop} does not exist.`);
        }
    }
};

const proxyData = new Proxy(data, handler);

 
async function fetchData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = proxyData.find(user => user.id === userId);
            if (user) {
                resolve(user);
            } else {
                reject('User not found');
            }
        }, 1000);
    });
}

 
function* userIterator(users) {
    for (let user of users) {
        yield user;
    }
}

 
async function processUsers() {
    const iterator = userIterator(proxyData);

    for (let user of iterator) {
        try {
            const userData = await fetchData(user.id);
            print(`Fetched User: ${userData.name}, Age: ${userData.age}`);
        } catch (error) {
            console.error(error);
        }
    }
}

 
function printUser({ name, age, ...rest }) {
    print(`User: ${name}, Age: ${age}`);
    print('Additional Info:', rest);
}

 
const uniqueAges = new Set(proxyData.map(user => user.age));
print('Unique Ages:', [...uniqueAges]);

const userMap = new Map(proxyData.map(user => [user.id, user]));
print('User Map:', userMap);

processUsers();
printUser({ id: 5, name: 'Eve', age: 29, country: 'Wonderland' });
