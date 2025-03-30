 

 
function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ userId: 1, name: 'John Doe', email: 'john.doe@example.com' });
        }, 1000);
    });
}

 
async function getUserData() {
    try {
        const { name, email } = await fetchData();  
        print(`Name: ${name}, Email: ${email}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
const userHandler = {
    get: (target, prop) => {
        print(`Accessing property: ${prop}`);
        return target[prop];
    }
};

 
const user = {
    userId: 1,
    name: 'John Doe',
    email: 'john.doe@example.com'
};

 
const proxyUser = new Proxy(user, userHandler);

 
print(proxyUser.name);
print(proxyUser.email);

 
getUserData();
