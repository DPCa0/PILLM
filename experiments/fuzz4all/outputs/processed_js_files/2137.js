class Person {
    #firstName;
    #lastName;
  
    constructor(firstName, lastName) {
        this.#firstName = firstName;
        this.#lastName = lastName;
    }
  
    get fullName() {
        return `${this.#firstName} ${this.#lastName}`;
    }

    static async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data.map(item => new Person(item.firstName, item.lastName));
    }
}

(async () => {
    const dataUrl = 'https://api.example.com/people';
  
    try {
        const people = await Person.fetchData(dataUrl);
        const sortedPeople = people.sort((a, b) => a.fullName.localeCompare(b.fullName));

        const ul = document.createElement('ul');
        sortedPeople.forEach(person => {
            const li = document.createElement('li');
            li.textContent = person.fullName;
            ul.appendChild(li);
        });

        document.body.appendChild(ul);

        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                print(`Mutation detected: ${mutation.type}`);
            });
        });

        observer.observe(document.body, { childList: true });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
