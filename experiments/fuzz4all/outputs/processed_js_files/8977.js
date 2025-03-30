 

 
function fetchData(endpoint) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                users: [
                    { id: 1, name: 'Alice', age: 30 },
                    { id: 2, name: 'Bob', age: 25 },
                    { id: 3, name: 'Charlie', age: 35 }
                ]
            };
            endpoint === '/users' ? resolve(data) : reject('Endpoint not found');
        }, 1000);
    });
}

 
async function getUsers() {
    try {
        const { users } = await fetchData('/users');
        return users;
    } catch (error) {
        console.error(error);
    }
}

 
function* filterUsersByAge(users, age) {
    for (let user of users) {
        if (user.age >= age) {
            yield user;
        }
    }
}

 
(async () => {
    const users = await getUsers();
    const minAge = 30;
    const generator = filterUsersByAge(users, minAge);

    print(`Users aged ${minAge} and above:`);
    for (let user of generator) {
        print(user);
    }
})();
