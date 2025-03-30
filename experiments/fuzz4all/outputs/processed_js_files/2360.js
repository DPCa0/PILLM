 
class Person {
    #age;
    
    constructor(name, age) {
        this.name = name;
        this.#age = age;
    }
    
    getAge() {
        return this.#getProtectedAge();
    }
    
    #getProtectedAge() {
        return this.#age;
    }
    
    static async fetchRandomPerson() {
        const response = await fetch('https://randomuser.me/api/');
        const data = await response.json();
        const userInfo = data.results[0];
        return new Person(userInfo.name.first, userInfo.dob.age);
    }
}

 
const handler = {
    get: (target, prop, receiver) => {
        const origMethod = target[prop];
        if (prop === 'getAge') {
            return function (...args) {
                const result = origMethod.apply(this, args);
                return `The age is ${result}`;
            }
        }
        return Reflect.get(target, prop, receiver);
    }
};

 
async function main() {
    try {
        const personPromises = [Person.fetchRandomPerson(), Person.fetchRandomPerson()];
        const persons = await Promise.all(personPromises);
        
        persons.forEach(person => {
            const proxy = new Proxy(person, handler);
            print(`Hello, my name is ${proxy.name}. ${proxy.getAge()}`);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

main();
