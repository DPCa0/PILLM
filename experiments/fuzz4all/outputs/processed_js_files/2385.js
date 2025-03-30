 

 
const apiData = {
    users: [
        { id: 1, name: 'John Doe', role: 'admin' },
        { id: 2, name: 'Jane Smith', role: 'user' },
        { id: 3, name: 'Mike Brown', role: 'user' }
    ]
};

 
function fetchData(endpoint) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(apiData[endpoint]), 1000);
    });
}

 
const apiProxy = new Proxy(apiData, {
    get(target, property) {
        print(`Accessing ${property} data...`);
        return target[property];
    }
});

 
function* userGenerator(users) {
    for (const user of users) {
        yield user;
    }
}

 
async function processData() {
    try {
         
        const users = await fetchData('users');
        print('Users fetched:', users);

         
        const proxiedUsers = apiProxy.users;
        
         
        const gen = userGenerator(proxiedUsers);
        for (const user of gen) {
            print(`User ID: ${user.id}, Name: ${user.name}, Role: ${user.role}`);
        }
    } catch (error) {
        console.error('Error processing data:', error);
    }
}

 
processData();
