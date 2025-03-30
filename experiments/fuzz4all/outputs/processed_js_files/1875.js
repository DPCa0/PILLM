 

 
const fetchData = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 25 },
                { id: 2, name: 'Bob', age: 30 },
                { id: 3, name: 'Charlie', age: 35 }
            ]);
        }, 1000);
    });
};

 
class UserCollection {
    constructor(users = []) {
        this.users = users;
    }

     
    addUser({ id, name, age }) {
        this.users.push({ id, name, age });
    }

     
    removeUser(id) {
        this.users = this.users.filter(user => user.id !== id);
    }

     
    findUsersAboveAge(age) {
        return this.users.filter(user => user.age > age);
    }
}

 
(async () => {
    try {
        const data = await fetchData();
        const userCollection = new UserCollection(data);

         
        userCollection.addUser({ id: 4, name: 'Diana', age: 28 });

         
        userCollection.removeUser(2);

         
        const matureUsers = userCollection.findUsersAboveAge(26);

         
        print(`Users above age 26: ${matureUsers.map(({ name }) => name).join(', ')}`);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
