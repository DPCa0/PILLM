 

 
function fetchData(apiUrl) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (apiUrl) {
                resolve({
                    user: {
                        name: 'Jane Doe',
                        age: 28,
                        hobbies: ['reading', 'hiking', 'coding']
                    },
                    location: 'New York'
                });
            } else {
                reject(new Error('Invalid URL'));
            }
        }, 2000);
    });
}

 
async function dynamicImportModule() {
    const { formatUserData } = await import('./userModule.js');
    return formatUserData;
}

 
class User {
    constructor(name, age, hobbies) {
        this.name = name;
        this.age = age;
        this.hobbies = hobbies;
    }

    getUserInfo() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}

 
(async function() {
    try {
        const apiUrl = 'https://api.example.com/user';
        const data = await fetchData(apiUrl);

        const { user, location } = data;   
        const { name, age, hobbies } = user;

        const formatUserData = await dynamicImportModule();

        const userInstance = new User(name, age, hobbies);
        print(userInstance.getUserInfo());

        print(`Location: ${location}`);
        print(`Hobbies: ${hobbies.join(', ')}`);

         
        print(`User Details: ${formatUserData(user)}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
})();
