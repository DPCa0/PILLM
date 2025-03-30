 
async function fetchUserData() {
    try {
        const userIds = [1, 2, 3];
        
        const fetchUser = userId => new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.1) {
                    resolve({ id: userId, name: `User ${userId}` });
                } else {
                    reject(`Failed to fetch user with id ${userId}`);
                }
            }, 1000);
        });

        const users = await Promise.all(userIds.map(userId => fetchUser(userId)));

        users.forEach(({ id, name }) => {
            print(`ID: ${id}, Name: ${name}`);
        });

    } catch (error) {
        console.error(`Error fetching user data: ${error}`);
    }
}

fetchUserData();

 
const user = { name: 'John Doe', age: 30 };
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value);
    }
};

const proxyUser = new Proxy(user, handler);
print(proxyUser.name);
proxyUser.age = 31;

 
function* generateSequence() {
    yield 1;
    yield 2;
    yield 3;
}

const generator = generateSequence();
for (let value of generator) {
    print(value);
}

 
const sym1 = Symbol('unique');
const sym2 = Symbol('unique');

const set = new Set();
set.add(sym1);
set.add(sym2);

print(set.size);  

 
const map = new Map();
const objKey = { name: 'keyObject' };
map.set(objKey, 'value');

print(map.get(objKey));  

 
async function* asyncNumbers() {
    for (let i = 0; i < 3; i++) {
        yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
    }
}

(async () => {