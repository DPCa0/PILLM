 

 
const fetchData = (url) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (url === "https://api.example.com/data") {
            resolve({ data: "Sample data from API" });
        } else {
            reject(new Error("Invalid URL"));
        }
    }, 2000);
});

 
async function getData() {
    try {
        const response = await fetchData("https://api.example.com/data");
        print("Data received:", response.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
    }
}

 
const user = {
    name: "Jane Doe",
    age: 30,
    location: { city: "New York", country: "USA" }
};
const { name, location: { city, country } } = user;
print(`User: ${name}, Location: ${city}, ${country}`);

 
(() => {
    print("IIFE Executed: Immediately Invoked Function Expression");
})();

 
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];
print("Original array:", arr1);
print("New array:", arr2);

 
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const person = new Person("John", "Doe");
print("Full Name:", person.fullName());

 
getData();
