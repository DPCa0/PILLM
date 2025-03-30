 
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

     
    get info() {
        return `${this.name} is ${this.age} years old.`;
    }

     
    static compareAge(person1, person2) {
        return person1.age - person2.age;
    }

     
    async getAgeInYears(years) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.age + years);
            }, 1000);
        });
    }
}

 
const _privateMethod = Symbol('privateMethod');

 
const Talkative = (superclass) => class extends superclass {
    speak() {
        print(`${this.name} says hello!`);
    }
};

 
class Student extends Talkative(Person) {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }

    get gradeInfo() {
        return `${this.name} is in grade ${this.grade}.`;
    }

    [_privateMethod]() {
        return "This is a private method!";
    }
}

 
const [john, jane] = [
    new Student('John', 20, 'Sophomore'),
    new Student('Jane', 22, 'Senior')
];

 
const displayInfo = ({ name, age, grade }) => {
    print(`${name}, aged ${age}, is in grade ${grade}.`);
};

 
(async () => {
    displayInfo(john);
    john.speak();
    print(await john.getAgeInYears(5));

    displayInfo(jane);
    jane.speak();
    print(await jane.getAgeInYears(3));

    print('Comparing ages:', Person.compareAge(john, jane));
})();
