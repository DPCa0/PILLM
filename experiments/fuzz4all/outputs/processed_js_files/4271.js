 
const createUser = (() => {
    const _privateData = new WeakMap();
    return function (name, age) {
        const privateProps = { id: Symbol(), created: new Date() };
        _privateData.set(this, privateProps);
        this.name = name;
        this.age = age;
    };
})();

createUser.prototype.getPrivateData = function () {
    const privateProps = new WeakMap().get(this);
    return privateProps ? privateProps : 'No private data!';
};

 
async function fetchUserData(url) {
    const response = await fetch(url);
    const users = await response.json();
    return users.map(({ id, name, ...rest }) => ({ userId: id, userName: name, ...rest }));
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Getting ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
        print(`Setting ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

const user = new Proxy(new createUser('John', 30), handler);

 
print(user.name);     
user.age = 31;              
print(user.age);      

 
(async () => {
    try {
        const usersData = await fetchUserData('https://jsonplaceholder.typicode.com/users');
        print(usersData);
    } catch (error) {
        console.error('Failed to fetch user data', error);
    }
})();
