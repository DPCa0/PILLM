 
class Person {
    #privateName;  
    
    constructor(name, age) {
        this.#privateName = name;
        this.age = age;
    }
    
    get name() {
        return this.#privateName;
    }
    
    set name(newName) {
        if (newName) {
            this.#privateName = newName;
        }
    }
    
    static compareAges(person1, person2) {
        return person1.age - person2.age;
    }

    *yearGenerator() {  
        let startYear = new Date().getFullYear();
        while(true) {
            yield `${this.name} in ${startYear++}`;
        }
    }
}

 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

 
async function fetchMultipleUrls(urls) {
    try {
        let data = await Promise.all(urls.map(url => fetchData(url)));
        print('Fetched data:', data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

 
let alice = new Person('Alice', 30);
let bob = new Person('Bob', 25);

 
print('Comparing ages:', Person.compareAges(alice, bob));

 
const yearIterator = alice.yearGenerator();
print(yearIterator.next().value);
print(yearIterator.next().value);

 
fetchMultipleUrls(['https://api.example.com/data1', 'https://api.example.com/data2']);
