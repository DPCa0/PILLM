 

class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get details() {
        return `${this.name}, ${this.age} years old`;
    }
}

const fetchUserData = async () => {
     
    const fetchData = () =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = Math.random() > 0.2;  
                success ? resolve({ name: "Jane Doe", age: 28 }) : reject("Failed to fetch data");
            }, 1000);
        });

    try {
        const { name, age } = await fetchData();  
        const user = new User(name, age);

        print(`User Details: ${user.details}`);  
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const executeTasks = async () => {
    await fetchUserData();

     
    Promise.resolve("Task 1 Complete")
        .then((message) => {
            print(message);
            return "Task 2 Complete";
        })
        .then((message) => {
            print(message);
            throw new Error("Something went wrong in Task 3");  
        })
        .catch((error) => {
            console.error(`Caught Error: ${error.message}`);
        })
        .finally(() => {
            print("All tasks attempted");
        });
};

executeTasks();
