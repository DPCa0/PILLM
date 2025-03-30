 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'Alice', age: 30, hobbies: ['Reading', 'Hiking', 'Coding'] }), 1000);
});

 
class User {
    #name;
    #age;
    #hobbies;
    constructor({ name, age, hobbies }) {
        this.#name = name;
        this.#age = age;
        this.#hobbies = hobbies;
    }
    
    #generateGreeting = () => `Hello, my name is ${this.#name} and I am ${this.#age} years old.`;

    get profile() {
        return {
            greeting: this.#generateGreeting(),
            hobbies: this.#hobbies.join(', ')
        };
    }

    set addHobby(hobby) {
        this.#hobbies = [...this.#hobbies, hobby];
    }
}

 
(async () => {
    try {
         
        const userData = await fetchData();
        const user = new User(userData);

         
        const hobbies = user.profile?.hobbies ?? 'No hobbies listed';

        print(user.profile.greeting);  
        print(`Hobbies: ${hobbies}`);

         
        user.addHobby = 'Photography';
        print(`Updated hobbies: ${user.profile.hobbies}`);
        
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();
