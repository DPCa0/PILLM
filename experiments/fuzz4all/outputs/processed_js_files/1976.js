 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ user: { name: 'Alice', age: 30 } });
        }, 1000);
    });
}

 
async function getUserData() {
    try {
        const data = await fetchData();
        print('Data fetched:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const idSymbol = Symbol('id');

 
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

 
const user = {
    [idSymbol]: 101,
    name: 'Bob',
    age: 25
};

const proxiedUser = new Proxy(user, handler);

 
getUserData();

print(proxiedUser.name);   
proxiedUser.age = 26;            
print(proxiedUser[idSymbol]);  

 
Promise.resolve()
    .then(() => fetchData())
    .then(data => {
        print('Promise resolved with data:', data);
        return data.user;
    })
    .then(user => {
        user.newProperty = 'example';   
        print('Modified user:', user);
    })
    .catch(error => {
        console.error('Promise chain error:', error);
    });
