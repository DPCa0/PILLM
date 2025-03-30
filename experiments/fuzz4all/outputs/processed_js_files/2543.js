 
class Person {
    #name;  

    constructor(name, age) {
        this.#name = name;
        this.age = age;
    }

     
    getName() {
        return this.#name;
    }

     
    async getAgeAfterYears(years) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(this.age + years), 1000);
        });
    }
}

 
function introducePeople(...people) {
    people.forEach(person => {
        print(`Meet ${person.getName()}, who is ${person.age} years old.`);
    });
}

 
const { firstName, lastName } = { firstName: "Jane", lastName: "Doe" };
print(`Person: ${firstName} ${lastName}`);

 
const uniqueAges = new Set([20, 21, 22, 22, 23, 24]);

 
uniqueAges.forEach(age => print(`Unique age: ${age}`));

 
const handler = {
    get: (target, prop) => {
        print(`Property ${prop} was accessed`);
        return target[prop];
    }
};

const person = new Proxy(new Person("John", 25), handler);

 
(async () => {
    introducePeople(person);
    print(`Age after 5 years: ${await person.getAgeAfterYears(5)}`);
})();
