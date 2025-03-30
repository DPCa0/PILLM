 
const readline = require('readline');

 
function getInput(prompt) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve) => rl.question(prompt, (ans) => {
        rl.close();
        resolve(ans);
    }));
}

 
const userProxyHandler = {
    get: (target, prop) => {
        if (prop in target) {
            return target[prop];
        } else {
            return `Property ${prop} doesn't exist.`;
        }
    }
};

// Creating a class with dynamic properties
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return `Hello, ${this.name}! You are ${this.age} years old.`;
    }
}

(async () => {
    // Using Template Literals for string formatting
    const name = await getInput('Enter your name: ');
    const age = await getInput('Enter your age: ');

    // Creating a Proxy object to wrap an instance of User
    const user = new User(name, parseInt(age));
    const proxiedUser = new Proxy(user, userProxyHandler);
    
    // Using destructuring and rest operator
    const { name: userName, age: userAge, nonExistentProperty } = proxiedUser;
    
    // Using Optional chaining and Nullish Coalescing
    print(proxiedUser?.greet() ?? 'Greeting method unavailable.');
    print(`Name: ${userName}, Age: ${userAge}`);
    print(nonExistentProperty);

    // Using Arrow function for concise functions
    const displayGoodbye = () => print('Goodbye!');
    displayGoodbye();
})();
