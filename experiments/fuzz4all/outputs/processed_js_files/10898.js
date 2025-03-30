class Person {
    #name;
    constructor(name, age) {
        this.#name = name;
        this.age = age;
    }

    getDetails() {
        return `Name: ${this.#name}, Age: ${this.age}`;
    }

    static async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
        }
    }
}

 
const handler = {
    get(target, prop) {
        print(`Getting ${prop}`);
        return prop in target ? target[prop] : undefined;
    },
    set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
    }
};

const person = new Proxy(new Person('Alice', 30), handler);
print(person.getDetails());

person.age = 31;  
print(person.age);  

 
(async () => {
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2'
    ];
    const fetchPromises = urls.map(url => Person.fetchData(url));
    
    try {
        const results = await Promise.all(fetchPromises);
        print('Fetched data:', results);
    } catch (error) {
        console.error('Error in async IIFE:', error);
    }
})();
