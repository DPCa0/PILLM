class Person {
    #privateField = 'Private Data';
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    *generateYears() {
        for (let i = 1; i <= this.age; i++) {
            yield i;
        }
    }

    get secret() {
        return this.#privateField;
    }

    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            print(data);
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }

    static #capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static describePerson(person) {
        const { name, age } = person;
        return `${Person.#capitalize(name)} is ${age} years old.`;
    }
}

const john = new Person('john', 30);
print(john.secret);
for (const year of john.generateYears()) {
    print(`Year: ${year}`);
}

john.fetchData('https://jsonplaceholder.typicode.com/todos/1');

print(Person.describePerson(john));
