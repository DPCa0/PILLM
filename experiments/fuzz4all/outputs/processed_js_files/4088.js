 

class User {
    constructor({ name, age }) {
        this.name = name;
        this.age = age;
    }

    getDetails() {
        return `${this.name}, ${this.age} years old`;
    }
}

const fetchUserData = async () => {
     
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ name: "Alice", age: 28, role: "Developer" });
        }, 1000);
    });
};

const processUser = async () => {
    try {
        const userData = await fetchUserData();
        const { name, age, ...rest } = userData;  
        const user = new User({ name, age });

        print("User Details: ", user.getDetails());
        print("Additional Info: ", rest);
        
        const updatedUser = { ...userData, location: 'Remote' };  
        print("Updated User: ", updatedUser);
    } catch (error) {
        console.error("Error processing user: ", error);
    }
};

processUser();
