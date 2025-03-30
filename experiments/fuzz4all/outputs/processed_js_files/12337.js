 

 
class User {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }

     
    async updateUserData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

             
            const { name, age, email } = data;
            this.name = name || this.name;
            this.age = age || this.age;
            this.email = email || this.email;
        } catch (error) {
            console.error('Failed to update user data:', error);
        }
    }

     
    toString() {
        return `User: ${this.name}, Age: ${this.age}, Email: ${this.email}`;
    }
}

 
function getUserData(url) {
    return fetch(url)
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
             
            print(`Fetched User Data: Name - ${data.name}, Age - ${data.age}, Email - ${data.email}`);
            return data;
        })
        .catch(error => console.error('Error fetching user data:', error));
}

 
const apiUrl = 'https://jsonplaceholder.typicode.com/users/1';

 
const user = new User('John Doe', 30, 'john.doe@example.com');
print(user.toString());

 
user.updateUserData(apiUrl).then(() => {
    print('Updated user data:');
    print(user.toString());
});

 
getUserData(apiUrl).then(data => {
    print('Promise chaining complete:', data);
});
