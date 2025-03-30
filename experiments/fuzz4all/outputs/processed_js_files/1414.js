 

 
const fetchData = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        const data = { name: 'John Doe', age: 30, occupation: 'Software Developer' };
        resolve(data);
    }, 1000);
});

async function getUserData() {
    try {
        const user = await fetchData();
        
         
        const { name, age, occupation } = user;
        
         
        print(`User Info:\nName: ${name}\nAge: ${age}\nOccupation: ${occupation}`);
        
         
        const skills = new Set(['JavaScript', 'React', 'Node.js']);
        skills.add('GraphQL');
        print('Skills:', [...skills].join(', '));

         
        const userMap = new Map();
        userMap.set('id', 1);
        userMap.set('location', 'New York');
        print('User Map:', JSON.stringify(Array.from(userMap.entries())));
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

getUserData();

 
const ROLE = Symbol('role');
const employee = {
    [ROLE]: 'Developer',
    name: 'Alice',
    displayRole() {
        print(`Role: ${this[ROLE]}`);
    }
};
employee.displayRole();

 
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        print(`Hello, my name is ${this.name}`);
    }
}

class Developer extends Person {
    constructor(name, language) {
        super(name);
        this.language = language;
    }

    code() {
        print(`${this.name} is coding in ${this.language}`);
    }
}

const dev = new Developer('Bob', 'JavaScript');
dev.greet();
dev.code();
