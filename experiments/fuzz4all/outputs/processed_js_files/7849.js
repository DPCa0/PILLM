class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    celebrateBirthday() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.age++;
                resolve(`Happy Birthday ${this.name}! You are now ${this.age}.`);
            }, 1000);
        });
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function createAndCelebrate(name, age) {
    const person = new Person(name, age);
    print(`Welcome ${person.name}, age ${person.age}.`);

     
    const [firstPerson, ...others] = [person, new Person('Alice', 30), new Person('Bob', 25)];
    print(`First in line: ${firstPerson.name}.`);
    
    print(`Other people: ${others.map(p => p.name).join(', ')}.`);

     
    const secret = Symbol('secret');
    person[secret] = 'Loves coding!';

     
    const clone = { ...person };
    for (const [key, value] of Object.entries(clone)) {
        print(`${key}: ${value}`);
    }

     
    const taggedTemplate = (strings, ...values) => {
        return strings.reduce((result, string, i) => `${result}${string}${values[i] || ''}`, '');
    };

    print(taggedTemplate`About: ${person.name}, Secret: ${person[secret]}.`);

    await delay(500);
    const message = await person.celebrateBirthday();
    print(message);

     
    (function () {
        const closureVariable = 'This is a closure variable.';
        print(closureVariable);
    })();
}

createAndCelebrate('John', 29);
