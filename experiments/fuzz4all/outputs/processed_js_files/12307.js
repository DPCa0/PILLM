 

 
const users = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
    { id: 3, name: 'Charlie', age: 35 },
];

 
function fetchUserDetails(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = users.find(u => u.id === id);
            user ? resolve(user) : reject('User not found');
        }, Math.random() * 1000);
    });
}

 
async function processUserDetails(id) {
    try {
        const user = await fetchUserDetails(id);
        print(`Fetched User: ${user.name}, Age: ${user.age}`);
    } catch (error) {
        console.error(error);
    }
}

 
const userAgeMap = new Map(users.map(user => [user.name, user.age]));

 
const ageLoggerHandler = {
    get(target, property) {
        if (target.has(property)) {
            print(`Accessing age of ${property}: ${target.get(property)}`);
            return target.get(property);
        }
        return undefined;
    }
};

const proxiedUserAgeMap = new Proxy(userAgeMap, ageLoggerHandler);

 
(async () => {
    await processUserDetails(1);
    await processUserDetails(2);
    
     
    print(`Alice's age: ${proxiedUserAgeMap.get('Alice')}`);
    print(`Charlie's age: ${proxiedUserAgeMap.get('Charlie')}`);
})();
