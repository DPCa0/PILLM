 
const handler = {
    get: (target, prop, receiver) => {
        print(`Getting ${String(prop)} from target`);
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        } else {
            return 'Property not found!';
        }
    },
    set: (target, prop, value) => {
        print(`Setting ${String(prop)} to ${value} on target`);
        return Reflect.set(target, prop, value);
    }
};

 
const data = {
    users: {
        'user1': { name: 'Alice', age: 30 },
        'user2': { name: 'Bob', age: 25 }
    }
};

const proxiedData = new Proxy(data, handler);

 
async function* fetchUsers() {
    yield { id: 1, name: 'Alice' };
    yield { id: 2, name: 'Bob' };
}

 
async function displayUsers() {
    for await (const user of fetchUsers()) {
        print(`User: ${user.name}`);
    }
}

 
const showMessage = ({ name, age }) => print(`Welcome, ${name}. You are ${age} years old.`);

 
proxiedData.users['user1'];  
proxiedData.users['user3'];  
proxiedData.users['user1'].age = 31;  

displayUsers();  

 
(async () => {
    const user = { name: 'Carol', age: 28 };
    showMessage(user);
})();
