 

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    static async fetchUsers() {
         
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { name: 'Alice', age: 25 },
                    { name: 'Bob', age: 30 },
                    { name: 'Charlie', age: 35 }
                ]);
            }, 1000);
        });
    }
}

(async () => {
    try {
         
        const userData = await User.fetchUsers();

         
        const users = userData.map(({ name, age }) => new User(name, age));

         
        const totalAge = users
            .filter(user => user.age > 30)
            .reduce((sum, user) => sum + user.age, 0);
        
        const count = users.filter(user => user.age > 30).length;
        const averageAge = count ? totalAge / count : 0;

        print(`Average age of users above 30: ${averageAge}`);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
})();
