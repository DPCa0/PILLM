 
async function fetchUsers() {
    const response = await fetch('https://randomuser.me/api/?results=10');
    const data = await response.json();

     
    const { results: users } = data;

     
    const averageAge = users
        .map(user => user.dob.age)
        .reduce((total, age, index, array) => {
            total += age;
            if (index === array.length - 1) return total / array.length;
            return total;
        }, 0);

     
    const olderUsers = users.filter(user => user.dob.age > averageAge);

    print(`Average Age: ${averageAge}`);
    print('Users older than average:', ...olderUsers.map(user => user.name.first));
}

 
async function performOperations() {
    try {
        await fetchUsers();
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

 
performOperations();

 
const userHandler = {
    get: function(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} does not exist`;
    }
};

const user = { name: 'Alice', age: 25 };
const proxiedUser = new Proxy(user, userHandler);

print(proxiedUser.name);  
print(proxiedUser.email);  
