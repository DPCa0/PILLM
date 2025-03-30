class Person {
    #name;
    
    constructor(name) {
        this.#name = name;
    }

    greet() {
        print(`Hello, my name is ${this.#name}.`);
    }

    static fromJSON(json) {
        return new Person(JSON.parse(json).name);
    }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function* fetchRandomJokes() {
    const url = 'https://official-joke-api.appspot.com/random_joke';
    while (true) {
        const response = await fetch(url);
        const joke = await response.json();
        yield `${joke.setup} - ${joke.punchline}`;
        await delay(2000);
    }
}

(async () => {
    const peopleJSON = '{"name": "Alice"}';
    const person = Person.fromJSON(peopleJSON);
    person.greet();

    const jokesGenerator = fetchRandomJokes();
    for await (const joke of jokesGenerator) {
        print(`Here's a joke: ${joke}`);
        if (joke.includes('pun')) break;   
    }
})();
