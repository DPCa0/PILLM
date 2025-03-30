 
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get userInfo() {
        return `${this.name}, ${this.age} years old`;
    }

    static compareAge(user1, user2) {
        return user1.age - user2.age;
    }
}

const users = [
    new User('Alice', 28),
    new User('Bob', 24),
    new User('Charlie', 32)
];

 
const [, ...youngerUsers] = users.sort(User.compareAge);

 
async function getUserInfo(user) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(user.userInfo), 1000);
    });
}

 
Promise.all(youngerUsers.map(user => getUserInfo(user)))
    .then(userInfos => {
         
        userInfos.forEach(info => print(`User Info: ${info}`));
    })
    .catch(error => console.error('Error:', error));
