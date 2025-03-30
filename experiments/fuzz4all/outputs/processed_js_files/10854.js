 

 
const fetchUserData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        Math.random() > 0.5 ? resolve({ name: 'Alice', age: 30 }) : reject('Fetch error');
    }, 1000);
});

 
async function getUserData() {
    try {
        let data = await fetchUserData();
        print('User data fetched:', data);
        return data;
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

 
const handler = {
    get(target, prop, receiver) {
        print(`Property '${prop}' was accessed`);
        return Reflect.get(...arguments);
    }
};

 
function createUserProxy(userData) {
    return new Proxy(userData, handler);
}

 
(async () => {
    print('Starting data fetch...');
    let userData = await getUserData();
    if (userData) {
        const user = createUserProxy(userData);
        print(`User's name is ${user.name}`);
        print(`User's age is ${user.age}`);
    }
})();
