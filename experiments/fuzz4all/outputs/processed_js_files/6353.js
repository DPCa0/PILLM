 

 
const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = {
                users: [
                    { id: 1, name: 'Alice', age: 28 },
                    { id: 2, name: 'Bob', age: 35 },
                ],
            };
            resolve(data);
        }, 2000);
    });
};

 
class UserProcessor {
    static processUsers(users) {
        return users.map(({ id, name, age }) => {
            return { id, fullName: `${name} Doe`, isAdult: age >= 18 };
        });
    }

    constructor(users) {
        this.users = users;
    }

    logUserNames() {
        this.users.forEach(({ fullName }) => print(`User: ${fullName}`));
    }
}

 
const main = async () => {
    print('Fetching data...');
    try {
        const { users } = await fetchData();  
        print('Data received');

        const processedUsers = UserProcessor.processUsers(users);
        print('Processed Users:', processedUsers);

        const userProcessor = new UserProcessor(processedUsers);
        userProcessor.logUserNames();
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

 
main();
