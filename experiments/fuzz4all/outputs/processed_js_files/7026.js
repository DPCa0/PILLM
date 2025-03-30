 

 
const userData = [
    { id: 1, name: 'Alice', age: 28 },
    { id: 2, name: 'Bob', age: 35 },
    { id: 3, name: 'Charlie', age: 24 },
    { id: 4, name: 'David', age: 31 }
];

 
const fetchUser = id => new Promise((resolve, reject) => {
    setTimeout(() => {
        const user = userData.find(user => user.id === id);
        user ? resolve(user) : reject(new Error('User not found'));
    }, Math.random() * 1000);
});

 
async function* fetchUsers(ids) {
    for (const id of ids) {
        try {
            const user = await fetchUser(id);
            yield user;
        } catch (error) {
            console.error(error.message);
        }
    }
}

 
async function processUsers(ids) {
    const users = [];
    for await (const user of fetchUsers(ids)) {
        users.push(user);
    }
    
     
    const processedUsers = users
        .filter(user => user.age > 25)
        .map(user => ({ ...user, canRentCar: user.age >= 30 }))
        .sort((a, b) => a.age - b.age)
        .reduce((acc, user) => {
            acc[user.id] = user;
            return acc;
        }, {});

    print(processedUsers);
}

 
processUsers([1, 2, 3, 4, 5]);
