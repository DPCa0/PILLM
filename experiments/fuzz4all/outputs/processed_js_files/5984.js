 
const data = {
    users: new Map([
        ['user1', { name: 'Alice', age: 30 }],
        ['user2', { name: 'Bob', age: 25 }]
    ]),
    settings: {
        theme: 'dark',
        notifications: true,
        language: 'en'
    },
    logs: []
};

 
const logsHandler = {
    get(target, prop, receiver) {
        if (prop === 'latest') {
            return target[target.length - 1];
        }
        return Reflect.get(...arguments);
    },
    set(target, prop, value) {
        print(`Log added: ${value}`);
        return Reflect.set(...arguments);
    }
};

data.logs = new Proxy(data.logs, logsHandler);

 
async function updateUser(userId, updateData) {
    const user = data.users.get(userId);
    if (!user) throw new Error('User not found');

     
    return new Promise((resolve) => {
        setTimeout(() => {
            Object.assign(user, updateData);
            data.logs.push(`User ${userId} updated`);
            resolve(user);
        }, 1000);
    });
}

 
async function performOperations() {
    try {
        print('Initial Users:', Array.from(data.users.entries()));

        const updatedUser = await updateUser('user1', { age: 31 });
        print('Updated User:', updatedUser);

        print('Latest Log:', data.logs.latest);
        
         
        function* userGenerator() {
            for (let [id, user] of data.users) {
                yield { id, ...user };
            }
        }

        const users = userGenerator();
        for (let user of users) {
            print(`User ID: ${user.id}, Name: ${user.name}, Age: ${user.age}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

performOperations();
